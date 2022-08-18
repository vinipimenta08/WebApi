using Microsoft.AspNetCore.Mvc;
using WebApplication1.Model;
using WebApplication1.Repositories;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class TodoListController : ControllerBase
    {
        private readonly IToDoListRepository _repository;
        public TodoListController(IToDoListRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<ToDoList>> GetToDoLists()
        {
            return await _repository.Get();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ToDoList>> GetToDoLists(int id)
        {
            return await _repository.Get(id);
        }

        [HttpPost]
        public async Task<ActionResult<ToDoList>> PostToDoLists([FromBody] ToDoList toDoList)
        {
            var newtoDoList = await _repository.Create(toDoList);
            return CreatedAtAction(nameof(GetToDoLists), new { id = newtoDoList.Id }, newtoDoList);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deletetoDoList = await _repository.Get(id);

            if(deletetoDoList == null)
                return NotFound();

            await _repository.Delete(deletetoDoList.Id);
            return NoContent();
        }
        [HttpPut]
        public async Task<ActionResult> PutToDoLists(int id, [FromBody] ToDoList toDoList)
        {
            if(id != toDoList.Id)
                return BadRequest();
    
            await _repository.Update(toDoList);
            return NoContent();
        }
    }
}
