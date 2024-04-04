document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "http://localhost:3000/todos";

  let todoList = document.getElementById("todo-list");
  let todoForm = document.querySelector("form");

  // Get all existing todos
  fetch(baseURL)
    .then((response) => response.json())
    .then((todos) => todos.forEach((todo) => addTodo(todo)));

  // Add event listener to form
  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let newTodo = todoForm.querySelector("#new-todo").value;

    let todoObj = {
      title: newTodo,
      completed: false,
    };

    // Make a POSt request
    fetch(baseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoObj),
    })
      .then((res) => res.json())
      .then((newTodo) => addTodo(newTodo));

    todoForm.reset();
  });

  function addTodo(todo) {
    let li = document.createElement("li");
    li.textContent = todo.title;
    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    // add event listener for click
    li.addEventListener("click", (e) => {
      console.log(`Todo with id ${todo.id} has been clicked!`);
      todo.completed = !todo.completed;
      if (todo.completed) {
        e.target.style.textDecoration = "line-through";
      } else {
        e.target.style.textDecoration = "none";
      }

      fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ completed: todo.completed }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    });

    todoList.appendChild(li);
  }

  // addTodo("Testing");
});
