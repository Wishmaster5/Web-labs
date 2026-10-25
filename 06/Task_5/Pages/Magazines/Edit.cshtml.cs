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

namespace Task_5.Pages.Magazines
{
    public class EditModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public EditModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        [BindProperty]
        public Magazine Magazine { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var magazine =  await _context.Magazine.FirstOrDefaultAsync(m => m.Id == id);
            if (magazine == null)
            {
                return NotFound();
            }
            Magazine = magazine;
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

            _context.Attach(Magazine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MagazineExists(Magazine.Id))
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

        private bool MagazineExists(int id)
        {
            return _context.Magazine.Any(e => e.Id == id);
        }
    }
}
