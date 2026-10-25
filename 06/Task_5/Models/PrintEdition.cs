using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Task_5.Models
{
    public class PrintEdition
    {
        public int Id { get; set; }

        [Required]
        [Display(Name = "Издательство")]
        public string publisher { get; set; }

        [Range(1900, 2026)]
        [Required]
        [Display(Name = "Год")]
        public int year { get; set; }

        [Required]
        [Display(Name = "Название")]
        public string name { get; set; }

    }
}
