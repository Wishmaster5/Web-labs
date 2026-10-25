using System.ComponentModel.DataAnnotations;

namespace Task_5.Models
{
    public class TextBook : Book
    {
        [Required]
        [Display(Name = "Назначение учебника")]
        public string purpose { get; set; }
    }
}
