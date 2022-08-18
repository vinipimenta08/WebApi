using System.ComponentModel.DataAnnotations;

namespace WebApplication1.Model
{
    public class ToDoList
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
    }
}
