
// Переменные
let age = "12";
let name = "John";

// Применение переменных
let output = <span>{name} is {age} years old</span>;

export default function Task_1() {
    return (
        <>
            <div className="border-2 border-indigo-600 task-container">
                <h1>Задание 1</h1>
                <div>{output}</div>
            </div>

        </>
    )

}