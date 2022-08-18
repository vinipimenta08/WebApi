using Microsoft.EntityFrameworkCore;
using WebApplication1.Model;

namespace WebApplication1.Repositories
{
    public class ToDoListRepository : IToDoListRepository
    {
        public readonly ToDoListContext _context;
        public ToDoListRepository(ToDoListContext context)
        {
            _context = context;
        }

        public async Task<ToDoList> Create(ToDoList toDoList)
        {
            _context.ToDoList.Add(toDoList);
            await _context.SaveChangesAsync();

            return toDoList;
        }

        public async Task Delete(int id)
        {
            var toDoListDelete = await _context.ToDoList.FindAsync(id);
            _context.ToDoList.Remove(toDoListDelete);
            await _context.SaveChangesAsync();

        }

        public async Task<IEnumerable<ToDoList>> Get()
        {
            return await _context.ToDoList.ToListAsync();
        }

        public async Task<ToDoList> Get(int id)
        {
            return await _context.ToDoList.FindAsync(id);
        }

        public async Task Update(ToDoList toDoList)
        {
            _context.Entry(toDoList).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    }
}
