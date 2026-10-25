using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Task_5.Models;

namespace Task_5.Data
{
    public class Task_5Context : DbContext
    {
        public Task_5Context (DbContextOptions<Task_5Context> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PrintEdition>()
                .HasDiscriminator<string>("PrintEdition")
                .HasValue<Book>("Book")
                .HasValue<TextBook>("TextBook")
                .HasValue<Magazine>("Magazine");
        }


        public DbSet<Task_5.Models.PrintEdition> PrintEdition { get; set; } = default!;
        public DbSet<Task_5.Models.Book> Book { get; set; } = default!;
        public DbSet<Task_5.Models.Magazine> Magazine { get; set; } = default!;
        public DbSet<Task_5.Models.TextBook> TextBook { get; set; } = default!;
    }
}
