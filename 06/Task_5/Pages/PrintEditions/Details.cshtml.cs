using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Task_5.Data;
using Task_5.Models;

namespace Task_5.Pages.PrintEditions
{
    public class DetailsModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public DetailsModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        public PrintEdition PrintEdition { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var printedition = await _context.PrintEdition.FirstOrDefaultAsync(m => m.Id == id);

            if (printedition is not null)
            {
                PrintEdition = printedition;

                return Page();
            }

            return NotFound();
        }
    }
}
