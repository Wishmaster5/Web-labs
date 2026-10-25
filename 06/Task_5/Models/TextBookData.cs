using Microsoft.EntityFrameworkCore;
using Task_5.Data;

namespace Task_5.Models
{
    public class TextBookData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Task_5Context(
           serviceProvider.GetRequiredService<
               DbContextOptions<Task_5Context>>()))
            {
                if (context == null || context.TextBook == null)
                {
                    throw new ArgumentNullException("Null RazorPagesAppContext");
                }

                // Look for any movies.
                if (context.TextBook.Any())
                {
                    return;   // DB has been seeded
                }

                context.TextBook.AddRange(
                    new TextBook
                    {
                        purpose = "Science",
                        subject = "Popular Science",
                        author = "Unknown Author",
                        pages_count = 134,
                        publisher = "Unknown Publisher",
                        year = 1872,
                        name = "Popular Science"
                    },
                    new TextBook
                    {
                        purpose = "Study",
                        subject = "History",
                        author = "Benjamin de Carvalho, Julia Costa Lopez, Halvard Leira",
                        pages_count = 886,
                        publisher = "Taylor & Francis",
                        year = 2021,
                        name = "Routledge Handbook of Historical International Relations"
                    },
                    new TextBook
                    {
                        purpose = "Smile",
                        subject = "Palace",
                        author = "Rufus Bird, Simon Thurley, Michael Turner",
                        pages_count = 290,
                        publisher = "Yale University Press",
                        year = 2022,
                        name = "St James's Palace"
                    },
                    new TextBook
                    {
                        purpose = "Study",
                        subject = "Religion",
                        author = "T. F. Leong",
                        pages_count = 267,
                        publisher = "Wipf and Stock Publishers",
                        year = 2022,
                        name = "Our Reason for Being"
                    },
                    new TextBook
                    {
                        purpose = "Study",
                        subject = "Electronic government information",
                        author = "John E. Jessup, Robert W. Coakley",
                        pages_count = 528,
                        publisher = "Unknown Publisher",
                        year = 1979,
                        name = "A Guide to the Study and Use of Military History"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
