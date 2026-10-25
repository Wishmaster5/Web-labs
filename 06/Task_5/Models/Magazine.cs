using System.ComponentModel.DataAnnotations;

namespace Task_5.Models
{
    public class Magazine : PrintEdition
    {
        [Required]
        [Range(1, 1_000_000)]
        [Display(Name = "Номер журнала")]
        public int number  { get; set; }

        [Required]
        [Range(1, 12)]
        [Display(Name = "Месяц выпуска")]
        public int month { get; set; }
    }
}
