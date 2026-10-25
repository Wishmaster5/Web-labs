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
    public class IndexModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public IndexModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        public IList<TextBook> TextBook { get;set; } = default!;

        [BindProperty(SupportsGet = true)]
        public int textBooksCount { get; set; }

        public async Task OnGetAsync()
        {
            var textbooks = from tb in _context.TextBook
                            select tb;
            textBooksCount = textbooks.Count();
            TextBook = await _context.TextBook.ToListAsync();
        }
    }
}
