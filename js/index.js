document.addEventListener("DOMContentLoaded", () => {
  const baseURL ="http://localhost:3000/todos"

  let todoList = document.getElementById("todo-list");
  let todoForm = document.querySelector("form");

  // Get all existing todos
  fetch(baseURL)
    .then((response) => response.json())
    .then((todos) => todos.forEach((todo) => addTodo(todo.title)));

  // Add event listener to form
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTodo = todoForm.querySelector("#new-todo").value;
    addTodo(newTodo);

    todoForm.reset();
  });

  function addTodo(title) {
    let li = document.createElement("li");
    li.innerHTML = title;
    todoList.appendChild(li);
  }

  // addTodo("Testing");
});
