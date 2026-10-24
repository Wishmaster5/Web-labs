// Game state
const gameState = {
  board: [],
  currentPlayer: "white", // 'white' or 'black'
  selectedPiece: null,
  legalMoves: [],
  mustJump: false,
  jumpPossibilities: [],
  pieceCount: { white: 12, black: 12 },
  gameMode: "local", // 'local', 'ai', or 'multiplayer'
  aiDifficulty: "medium", // 'easy', 'medium', or 'hard'
  aiPlayer: "black", // AI is typically black
  aiThinking: false,
  roomId: null,
  isHost: false,
  playerColor: "white",
  opponentConnected: false,
  connection: null,
  consecutiveJumps: {
    active: false,
    piece: null,
  },
};

// Reset button
document.getElementById("reset-btn").addEventListener("click", () => {
  // If in multiplayer, notify the other player
  if (gameState.gameMode === "multiplayer" && gameState.opponentConnected) {
    sendResetRequest();
  }

  initializeBoard();
});

// Back button
document.getElementById("back-btn").addEventListener("click", () => {
  // Reset game mode selection
  document.querySelector(".mode-selector").style.display = "block";
  document.getElementById("difficulty-selector").classList.remove("visible");
  document.getElementById("multiplayer-controls").classList.remove("visible");
  document.getElementById("room-details").style.display = "none";
  document.getElementById("join-form").style.display = "none";
  document.getElementById("back-btn").style.display = "none";

  // If in multiplayer mode, disconnect
  if (gameState.gameMode === "multiplayer" && gameState.connection) {
    // In a real implementation, close the connection
    gameState.connection = null;
    gameState.opponentConnected = false;
  }

  gameState.gameMode = "local";

  // Reset and start a new local game
  initializeBoard();
});

// Set game mode and start
function setGameMode(mode) {
  gameState.gameMode = mode;

  // Hide mode selector
  document.querySelector(".mode-selector").style.display = "none";
  document.getElementById("back-btn").style.display = "inline-block";

  initializeBoard();
}

// Initialize the board
function initializeBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";
  gameState.board = [];
  gameState.pieceCount = { white: 12, black: 12 };
  gameState.selectedPiece = null;
  gameState.legalMoves = [];
  gameState.mustJump = false;
  gameState.jumpPossibilities = [];
  gameState.consecutiveJumps.active = false;
  gameState.consecutiveJumps.piece = null;

  // Create the 8x8 board
  for (let row = 0; row < 8; row++) {
    gameState.board[row] = [];
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.className = `square ${(row + col) % 2 === 0 ? "white" : "black"}`;
      square.dataset.row = row;
      square.dataset.col = col;

      // Add pieces
      if ((row + col) % 2 === 1) {
        if (row < 3) {
          // Black pieces at the top
          const piece = createPiece("black-piece", row, col);
          square.appendChild(piece);
          gameState.board[row][col] = { player: "black", isKing: false };
        } else if (row > 4) {
          // White pieces at the bottom
          const piece = createPiece("white-piece", row, col);
          square.appendChild(piece);
          gameState.board[row][col] = { player: "white", isKing: false };
        } else {
          // Empty square
          gameState.board[row][col] = null;
        }
      } else {
        // White squares are always empty
        gameState.board[row][col] = null;
      }

      square.addEventListener("click", handleSquareClick);
      board.appendChild(square);
    }
  }

  // Set the initial player turn
  gameState.currentPlayer = "white";
  updateTurnIndicator();

  // Check for mandatory jumps
  checkForMandatoryJumps();

  // Add animation to pieces
  const pieces = document.querySelectorAll(".piece");
  pieces.forEach((piece, index) => {
    setTimeout(() => {
      piece.classList.add("fade-in");
    }, index * 30);
  });

  // If AI mode and AI goes first (though typically white goes first)
  if (
    gameState.gameMode === "ai" &&
    gameState.currentPlayer === gameState.aiPlayer
  ) {
    setTimeout(makeAIMove, 1000);
  }
}

// Create a piece element
function createPiece(pieceClass, row, col) {
  const piece = document.createElement("div");
  piece.className = `piece ${pieceClass}`;
  piece.dataset.row = row;
  piece.dataset.col = col;

  piece.addEventListener("click", handlePieceClick);
  return piece;
}

// Update turn indicator
function updateTurnIndicator() {
  const turnText = document.getElementById("current-turn");
  const turnDot = document.getElementById("turn-dot");
  const thinkingIndicator = document.getElementById("thinking-indicator");

  let turnLabel =
    gameState.currentPlayer.charAt(0).toUpperCase() +
    gameState.currentPlayer.slice(1);

  // Add AI indicator if it's AI's turn
  if (
    gameState.gameMode === "ai" &&
    gameState.currentPlayer === gameState.aiPlayer
  ) {
    turnLabel += " (AI)";
    if (gameState.aiThinking) {
      thinkingIndicator.classList.add("visible");
    } else {
      thinkingIndicator.classList.remove("visible");
    }
  } else {
    thinkingIndicator.classList.remove("visible");
  }

  // Add player indicator in multiplayer
  if (gameState.gameMode === "multiplayer") {
    if (gameState.currentPlayer === gameState.playerColor) {
      turnLabel += " (You)";
    } else {
      turnLabel += " (Opponent)";
    }
  }

  turnText.textContent = turnLabel;

  if (gameState.currentPlayer === "white") {
    turnDot.className = "turn-dot white-turn";
  } else {
    turnDot.className = "turn-dot black-turn";
  }
}

// Handle piece click event
function handlePieceClick(event) {
  event.stopPropagation();

  // In multiplayer, only allow clicking your own color
  if (
    gameState.gameMode === "multiplayer" &&
    gameState.currentPlayer !== gameState.playerColor
  ) {
    return;
  }

  // In AI mode, don't allow clicking AI's pieces
  if (
    gameState.gameMode === "ai" &&
    gameState.currentPlayer === gameState.aiPlayer
  ) {
    return;
  }

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  // If consecutive jumps are active, only allow selecting the same piece
  if (gameState.consecutiveJumps.active) {
    if (
      row !== gameState.consecutiveJumps.piece.row ||
      col !== gameState.consecutiveJumps.piece.col
    ) {
      // Shake animation for wrong piece selection
      event.target.classList.add("shake");
      setTimeout(() => {
        event.target.classList.remove("shake");
      }, 500);
      return;
    }
  }

  // Make sure the player clicks their own pieces
  if (
    !gameState.board[row][col] ||
    gameState.board[row][col].player !== gameState.currentPlayer
  ) {
    // Shake animation for wrong piece selection
    event.target.classList.add("shake");
    setTimeout(() => {
      event.target.classList.remove("shake");
    }, 500);
    return;
  }

  // If there's a mandatory jump, only allow selecting pieces that can jump
  if (gameState.mustJump && !gameState.consecutiveJumps.active) {
    const canJump = gameState.jumpPossibilities.some(
      (pos) => pos.row === row && pos.col === col
    );

    if (!canJump) {
      // Shake animation for invalid selection
      event.target.classList.add("shake");
      setTimeout(() => {
        event.target.classList.remove("shake");
      }, 500);
      return;
    }
  }

  // Clear previous selection and legal moves
  clearSelection();

  // Select the piece with bounce animation
  gameState.selectedPiece = { row, col };
  event.target.classList.add("selected");
  event.target.classList.add("bounce");

  // Remove bounce animation after it completes
  setTimeout(() => {
    event.target.classList.remove("bounce");
  }, 500);

  // Show legal moves
  showLegalMoves(row, col);
}

// Handle square click event
function handleSquareClick(event) {
  // In multiplayer, only allow moves on your turn
  if (
    gameState.gameMode === "multiplayer" &&
    gameState.currentPlayer !== gameState.playerColor
  ) {
    return;
  }

  // In AI mode, only allow moves on player's turn
  if (
    gameState.gameMode === "ai" &&
    gameState.currentPlayer === gameState.aiPlayer
  ) {
    return;
  }

  if (!gameState.selectedPiece) {
    return;
  }

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  // Check if the clicked square is a legal move
  const isLegalMove = gameState.legalMoves.some(
    (move) => move.row === row && move.col === col
  );

  if (isLegalMove) {
    const move = gameState.legalMoves.find(
      (m) => m.row === row && m.col === col
    );

    // In multiplayer mode, send move to opponent
    if (gameState.gameMode === "multiplayer" && gameState.opponentConnected) {
      sendMoveToOpponent(
        gameState.selectedPiece.row,
        gameState.selectedPiece.col,
        row,
        col,
        move.isJump
      );
    }

    movePiece(row, col);
  }
}

// Show legal moves for a selected piece
function showLegalMoves(row, col) {
  gameState.legalMoves = [];
  const piece = gameState.board[row][col];

  if (gameState.mustJump) {
    // Only show jump moves
    getJumpMoves(row, col, piece).forEach((move) => {
      gameState.legalMoves.push(move);
      highlightLegalMove(move.row, move.col);
    });
  } else {
    // Show all possible moves
    getRegularMoves(row, col, piece).forEach((move) => {
      gameState.legalMoves.push(move);
      highlightLegalMove(move.row, move.col);
    });

    getJumpMoves(row, col, piece).forEach((move) => {
      gameState.legalMoves.push(move);
      highlightLegalMove(move.row, move.col);
    });
  }
}

// Highlight a legal move
function highlightLegalMove(row, col) {
  const square = document.querySelector(
    `.square[data-row="${row}"][data-col="${col}"]`
  );
  const legalMove = document.createElement("div");
  legalMove.className = "legal-move";
  legalMove.addEventListener("click", function () {
    // In multiplayer, only allow moves on your turn
    if (
      gameState.gameMode === "multiplayer" &&
      gameState.currentPlayer !== gameState.playerColor
    ) {
      return;
    }

    // In AI mode, only allow moves on player's turn
    if (
      gameState.gameMode === "ai" &&
      gameState.currentPlayer === gameState.aiPlayer
    ) {
      return;
    }

    const move = gameState.legalMoves.find(
      (m) => m.row === row && m.col === col
    );

    // In multiplayer mode, send move to opponent
    if (gameState.gameMode === "multiplayer" && gameState.opponentConnected) {
      sendMoveToOpponent(
        gameState.selectedPiece.row,
        gameState.selectedPiece.col,
        row,
        col,
        move.isJump
      );
    }

    movePiece(row, col);
  });
  square.appendChild(legalMove);
}

// Get regular (non-jump) moves
function getRegularMoves(row, col, piece) {
  const moves = [];
  const direction = piece.player === "white" ? -1 : 1;

  // Forward moves
  const forwardDirections = [
    { row: row + direction, col: col - 1 },
    { row: row + direction, col: col + 1 },
  ];

  if (piece.isKing) {
    forwardDirections.push(
      { row: row - direction, col: col - 1 },
      { row: row - direction, col: col + 1 }
    );
  }

  // Check each potential move
  forwardDirections.forEach((dir) => {
    if (
      isValidPosition(dir.row, dir.col) &&
      !gameState.board[dir.row][dir.col]
    ) {
      moves.push({ row: dir.row, col: dir.col, isJump: false });
    }
  });

  return moves;
}

// Get jump moves
function getJumpMoves(row, col, piece) {
  const moves = [];
  const direction = piece.player === "white" ? -1 : 1;
  const opponent = piece.player === "white" ? "black" : "white";

  // Forward jump directions
  const jumpDirections = [
    {
      over: { row: row + direction, col: col - 1 },
      land: { row: row + 2 * direction, col: col - 2 },
    },
    {
      over: { row: row + direction, col: col + 1 },
      land: { row: row + 2 * direction, col: col + 2 },
    },
  ];

  // If the piece is a king, add backward jumps
  if (piece.isKing) {
    jumpDirections.push(
      {
        over: { row: row - direction, col: col - 1 },
        land: { row: row - 2 * direction, col: col - 2 },
      },
      {
        over: { row: row - direction, col: col + 1 },
        land: { row: row - 2 * direction, col: col + 2 },
      }
    );
  }

  // Check each potential jump
  jumpDirections.forEach((dir) => {
    // Check if the position to jump over is valid and has an opponent's piece
    if (
      isValidPosition(dir.over.row, dir.over.col) &&
      gameState.board[dir.over.row][dir.over.col] &&
      gameState.board[dir.over.row][dir.over.col].player === opponent
    ) {
      // Check if the landing position is valid and empty
      if (
        isValidPosition(dir.land.row, dir.land.col) &&
        !gameState.board[dir.land.row][dir.land.col]
      ) {
        moves.push({
          row: dir.land.row,
          col: dir.land.col,
          isJump: true,
          jumpedRow: dir.over.row,
          jumpedCol: dir.over.col,
        });
      }
    }
  });

  return moves;
}

// Check if a position is on the board
function isValidPosition(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

// Clear selection and legal moves
function clearSelection() {
  // Remove selected class from any piece
  const selectedPieces = document.querySelectorAll(".piece.selected");
  selectedPieces.forEach((piece) => {
    piece.classList.remove("selected");
  });

  // Remove legal move indicators
  const legalMoves = document.querySelectorAll(".legal-move");
  legalMoves.forEach((move) => {
    move.remove();
  });

  gameState.selectedPiece = null;
  gameState.legalMoves = [];
}

// Move a piece
function movePiece(toRow, toCol) {
  const fromRow = gameState.selectedPiece.row;
  const fromCol = gameState.selectedPiece.col;
  const piece = gameState.board[fromRow][fromCol];

  // Find the move object
  const move = gameState.legalMoves.find(
    (m) => m.row === toRow && m.col === toCol
  );

  // Move the piece in the game state
  gameState.board[toRow][toCol] = { ...piece };
  gameState.board[fromRow][fromCol] = null;

  // Check if the piece should become a king
  if (
    (piece.player === "white" && toRow === 0) ||
    (piece.player === "black" && toRow === 7)
  ) {
    gameState.board[toRow][toCol].isKing = true;
  }

  // Move the piece on the board
  const pieceElement = document.querySelector(
    `.piece[data-row="${fromRow}"][data-col="${fromCol}"]`
  );
  const toSquare = document.querySelector(
    `.square[data-row="${toRow}"][data-col="${toCol}"]`
  );

  pieceElement.dataset.row = toRow;
  pieceElement.dataset.col = toCol;

  // Update king status if needed
  if (
    gameState.board[toRow][toCol].isKing &&
    !pieceElement.classList.contains("king")
  ) {
    pieceElement.classList.add("king");

    // Add crown animation
    pieceElement.classList.add("bounce");
    setTimeout(() => {
      pieceElement.classList.remove("bounce");
    }, 500);
  }

  // Move the piece element to the new square
  toSquare.appendChild(pieceElement);

  // If it was a jump, remove the jumped piece
  let canJumpAgain = false;
  if (move.isJump) {
    // Remove the jumped piece from the board state
    gameState.board[move.jumpedRow][move.jumpedCol] = null;

    // Remove the jumped piece from the DOM with animation
    const jumpedPiece = document.querySelector(
      `.piece[data-row="${move.jumpedRow}"][data-col="${move.jumpedCol}"]`
    );
    jumpedPiece.classList.add("capture-animation");

    // Decrease piece count
    const jumpedPlayer = piece.player === "white" ? "black" : "white";
    gameState.pieceCount[jumpedPlayer]--;

    // After animation completes, remove the piece
    setTimeout(() => {
      jumpedPiece.remove();
    }, 500);

    // Check if the piece can jump again
    const additionalJumps = getJumpMoves(
      toRow,
      toCol,
      gameState.board[toRow][toCol]
    );
    if (additionalJumps.length > 0) {
      canJumpAgain = true;
    }
  }

  // Clear current selection
  clearSelection();

  // Handle consecutive jumps if possible
  if (canJumpAgain) {
    gameState.consecutiveJumps.active = true;
    gameState.consecutiveJumps.piece = { row: toRow, col: toCol };

    // Highlight the piece that can jump again
    const pieceElement = document.querySelector(
      `.piece[data-row="${toRow}"][data-col="${toCol}"]`
    );
    pieceElement.classList.add("selected");
    pieceElement.classList.add("bounce");

    // Show legal jumps
    showLegalMoves(toRow, toCol);

    // Don't switch turns yet
    return;
  }

  // Reset consecutive jumps
  gameState.consecutiveJumps.active = false;
  gameState.consecutiveJumps.piece = null;

  // Switch turns
  gameState.currentPlayer =
    gameState.currentPlayer === "white" ? "black" : "white";
  updateTurnIndicator();

  // Check if the game is over
  checkGameOver();

  // Check for mandatory jumps for the next player
  checkForMandatoryJumps();

  // If it's AI's turn, make the AI move
  if (
    gameState.gameMode === "ai" &&
    gameState.currentPlayer === gameState.aiPlayer
  ) {
    setTimeout(makeAIMove, 1000);
  }
}

// Check for mandatory jumps
function checkForMandatoryJumps() {
  gameState.mustJump = false;
  gameState.jumpPossibilities = [];

  // Check every piece of the current player for possible jumps
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (
        gameState.board[row][col] &&
        gameState.board[row][col].player === gameState.currentPlayer
      ) {
        const jumps = getJumpMoves(row, col, gameState.board[row][col]);
        if (jumps.length > 0) {
          gameState.mustJump = true;
          gameState.jumpPossibilities.push({ row, col });
        }
      }
    }
  }
}

// Check if the game is over
function checkGameOver() {
  // Check piece count
  if (gameState.pieceCount.white === 0) {
    showGameMessage("Black wins!");
    return true;
  }

  if (gameState.pieceCount.black === 0) {
    showGameMessage("White wins!");
    return true;
  }

  if (!canMove) {
    const winner = gameState.currentPlayer === "white" ? "Black" : "White";
    showGameMessage(`${winner} wins! No moves available.`);
    return true;
  }

  return false;
}

// Show game message
function showGameMessage(message) {
  const messageElement = document.getElementById("game-message");
  messageElement.textContent = message;
  messageElement.style.display = "block";

  // Hide after 3 seconds
  setTimeout(() => {
    messageElement.style.display = "none";
  }, 3000);
}

// Initialize the board when the page loads
document.addEventListener("DOMContentLoaded", () => {
  initializeBoard();
});
