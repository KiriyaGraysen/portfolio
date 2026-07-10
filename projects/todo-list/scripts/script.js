const todoList = JSON.parse(localStorage.getItem('todoLists')) || [];

function renderTodoList() {
  let todoListHTML = '';
  
  for (let i = 0; i < todoList.length; i++) {
    // short hand for:
    // const name = todoList[i].name;
    // const dueDate = todoList[i].dueDate;
    const { name, dueDate } = todoList[i];
    const html = `
    <div>
      ${name}
    </div>
    <div>
      ${dueDate}
    </div>
    <button onclick="deleteTodo(${i})" class="delete-btn">Delete</button>
    `;
    todoListHTML += html;
  }
  
  document.querySelector('.todo-list').innerHTML = todoListHTML;
}

renderTodoList();

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