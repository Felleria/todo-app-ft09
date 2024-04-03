document.addEventListener("DOMContentLoaded", () => {
  let todoList = document.getElementById("todo-list");
  let todoForm = document.querySelector("form");

  // Get all existing todos
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(data => addTodo(data[0].title))

  // Add event listener to form
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTodo = todoForm.querySelector("#new-todo").value;
    addTodo(newTodo);

    todoForm.reset();
  });

  function addTodo(value) {
    let li = document.createElement("li");
    li.innerHTML = value;
    todoList.appendChild(li);
  }

  // addTodo("Testing");
});
