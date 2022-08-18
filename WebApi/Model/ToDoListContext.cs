using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Model
{
    public class ToDoListContext : DbContext
    {
        public ToDoListContext(DbContextOptions<ToDoListContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
        public DbSet<ToDoList>? ToDoList { get; set; }
    }
}
