using Microsoft.EntityFrameworkCore;
using Task_5.Data;

namespace Task_5.Models
{
    public static  class BookData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new Task_5Context(
           serviceProvider.GetRequiredService<
               DbContextOptions<Task_5Context>>()))
            {
                if (context == null || context.Book == null)
                {
                    throw new ArgumentNullException("Null RazorPagesAppContext");
                }

                // Look for any movies.
                if (context.Book.Any())
                {
                    return;   // DB has been seeded
                }

                context.Book.AddRange(
                    new Book
                    {
                        subject = "Literary Criticism",
                        author = "Peter Lamarque",
                        pages_count = 252,
                        publisher = "Cornell University Press",
                        year = 1996,
                        name = "Fictional Points of View"
                    },
                    new Book
                    {
                        subject = "Reference",
                        author = "R. Reginald, Douglas Menville, Mary A. Burgess",
                        pages_count = 802,
                        publisher = "Wildside Press LLC",
                        year = 2010,
                        name = "Science Fiction and Fantasy Literature"
                    },
                    new Book
                    {
                        subject = "Subject headings, Library of Congress",
                        author = "Library of Congress. Cataloging Policy and Support Office",
                        pages_count = 1662,
                        publisher = "Wildside Press LLC",
                        year = 2004,
                        name = "Library of Congress Subject Headings"
                    },
                    new Book
                    {
                        subject = "Fiction",
                        author = "Carl Darryl Malmgren",
                        pages_count = 248,
                        publisher = "Bucknell University Press",
                        year = 1985,
                        name = "Fictional Space in the Modernist and Post-modernist American Novel"
                    },
                    new Book
                    {
                        subject = "History",
                        author = "Robert Con Davis-Undiano",
                        pages_count = 337,
                        publisher = "University of Oklahoma Press",
                        year = 2017,
                        name = "Mestizos Come Home!"
                    },
                    new Book
                    {
                        subject = "Body, Mind & Spirit",
                        author = "Unknown Author",
                        pages_count = 384,
                        publisher = "BRILL",
                        year = 2021,
                        name = "Fictional Practice: Magic, Narration, and the Power of Imagination"
                    },
                    new Book
                    {
                        subject = "Literary Criticism",
                        author = "Timothy Dow Adams",
                        pages_count = 230,
                        publisher = "UNC Press Books",
                        year = 1990,
                        name = "Telling Lies in Modern American Autobiography"
                    },
                    new Book
                    {
                        subject = "Activity programs in education",
                        author = "Teacher Created Resources, Inc",
                        pages_count = 178,
                        publisher = "Teacher Created Resources",
                        year = 2008,
                        name = "Essential Skills - Reading and Writing, Grade 1"
                    },
                    new Book
                    {
                        subject = "English fiction",
                        author = "Unknown Author",
                        pages_count = 692,
                        publisher = "Unknown Publisher",
                        year = 1902,
                        name = "Pearson's Magazine"
                    },
                    new Book
                    {
                        subject = "Social Science",
                        author = "Mary Flanagan, Austin Boothr",
                        pages_count = 604,
                        publisher = "MIT Press",
                        year = 2002,
                        name = "Reload"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
