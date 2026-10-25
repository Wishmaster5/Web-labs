using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Task_5.Data;
using Task_5.Models;

namespace Task_5.Pages.Books
{
    public class IndexModel : PageModel
    {
        private readonly Task_5.Data.Task_5Context _context;

        public IndexModel(Task_5.Data.Task_5Context context)
        {
            _context = context;
        }

        public IList<Book> Book { get;set; } = default!;

        [BindProperty(SupportsGet = true)]
        public int? SearchYear { get; set; }

        public async Task OnGetAsync()
        {
            var books = from b in _context.Book
                        select b;

            if (SearchYear.HasValue)
            {
                books = books.Where(b => b.year >= SearchYear);
            }

            Book = await books.ToListAsync();
        }
    }
}
