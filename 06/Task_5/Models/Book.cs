using System.ComponentModel.DataAnnotations;

namespace Task_5.Models
{
    public class Book : PrintEdition
    {
        [Required]
        [Display(Name = "Тематика")]
        public string subject { get; set; }

        [Required]
        [Display(Name = "Автор книги")]
        public string author { get; set; }

        [Range(1, 10_000)]
        [Required]
        [Display(Name = "Количество страниц")]
        public int pages_count { get; set; }
    }
}
