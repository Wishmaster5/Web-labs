using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Task_5.Data;
using Task_5.Models;

namespace Task_5.Pages.PrintEditions
{
    public class CreateModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public CreateModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public PrintEdition PrintEdition { get; set; } = default!;

        // For more information, see https://aka.ms/RazorPagesCRUD.
        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            _context.PrintEdition.Add(PrintEdition);
            await _context.SaveChangesAsync();

            return RedirectToPage("./Index");
        }
    }
}
