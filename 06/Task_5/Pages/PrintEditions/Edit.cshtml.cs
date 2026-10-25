using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Task_5.Data;
using Task_5.Models;

namespace Task_5.Pages.PrintEditions
{
    public class EditModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public EditModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        [BindProperty]
        public PrintEdition PrintEdition { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var printedition =  await _context.PrintEdition.FirstOrDefaultAsync(m => m.Id == id);
            if (printedition == null)
            {
                return NotFound();
            }
            PrintEdition = printedition;
            return Page();
        }

        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.Attach(PrintEdition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrintEditionExists(PrintEdition.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return RedirectToPage("./Index");
        }

        private bool PrintEditionExists(int id)
        {
            return _context.PrintEdition.Any(e => e.Id == id);
        }
    }
}
