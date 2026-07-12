const todoList = JSON.parse(localStorage.getItem('todoLists')) || [];

function renderTodoList() {
  let todoListHTML = '';
  
  // The first parameter is the value if the current index
  // The second parameter is the index
  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const html = `
    <div>
      ${name}
    </div>
    <div>
      ${dueDate}
    </div>
    <button class="delete-btn">Delete</button>
    `;
    todoListHTML += html;
  });
  
  document.querySelector('.todo-list').innerHTML = todoListHTML;
  
  // Since we used the querySelectorAll to target all the delete button in the page it became a list. The problem is, the deleteTodo function has a parameter index to target and delete the specific item on TodoList using the corresponding delete button. To solve that, we need to loop through the list of button to get the index and use it for deleteTodo function.
  document.querySelectorAll('.delete-btn')
    .forEach((deleteBtn, index) => {
      deleteBtn.addEventListener('click', () => {
        deleteTodo(index);
      });
    });
}

renderTodoList();

document.querySelector('.add-btn').addEventListener('click', () => {
  addTodo();
});

document.querySelector('.name-input').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

function addTodo() {
  const nameInput = document.querySelector('.name-input');
  const name = nameInput.value;
  
  const dueDateInput = document.querySelector('.due-date');
  const dueDate = dueDateInput.value;
  
  todoList.push({
    // short hand for:
    // name: name,
    // dueDate: dueDate
    name,
    dueDate
  });
  
  localStorage.setItem('todoLists', JSON.stringify(todoList));
  nameInput.value = '';
  
  renderTodoList();
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  
  localStorage.setItem('todoLists', JSON.stringify(todoList));
  
  renderTodoList();
}