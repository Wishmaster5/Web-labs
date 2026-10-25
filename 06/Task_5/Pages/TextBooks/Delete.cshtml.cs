using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Task_5.Data;
using Task_5.Models;

namespace Task_5.Pages.TextBooks
{
    public class DeleteModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public DeleteModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        [BindProperty]
        public TextBook TextBook { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var textbook = await _context.TextBook.FirstOrDefaultAsync(m => m.Id == id);

            if (textbook is not null)
            {
                TextBook = textbook;

                return Page();
            }

            return NotFound();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var textbook = await _context.TextBook.FindAsync(id);
            if (textbook != null)
            {
                TextBook = textbook;
                _context.TextBook.Remove(TextBook);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
