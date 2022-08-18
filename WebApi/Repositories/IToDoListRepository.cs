using WebApplication1.Model;

namespace WebApplication1.Repositories
{
    public interface IToDoListRepository
    {
        Task<IEnumerable<ToDoList>> Get();

        Task<ToDoList> Get(int Id);

        Task<ToDoList> Create(ToDoList toDoList);

        Task Update(ToDoList toDoList);

        Task Delete(int Id);

    }
}
