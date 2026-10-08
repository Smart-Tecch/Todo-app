const btn = document.querySelector("button");
const input = document.querySelector('input[type="text"]');
const todoList = document.querySelector(".list");

// Store todos as objects with unique IDs
let todos = [];

// 1. Function to render todos to the DOM
function renderTodos() {
  todoList.innerHTML = todos
    .slice()
    .reverse()
    .map((todo) => {
      return `
        <li data-id="${todo.id}">
          <input type="checkbox" ${todo.completed ? "checked" : ""} class="todo-check">
          <span style="${todo.completed ? "text-decoration: line-through;" : ""}">${todo.text}</span>
          <button class="delete-btn">Delete</button>
        </li>
      `;
    })
    .join("");
}

// 2. Add new todo item
btn.addEventListener("click", () => {
  const value = input.value.trim();
  if (!value) return;

  todos.push({
    id: Date.now(),
    text: value,
    completed: false,
  });

  input.value = "";
  renderTodos();
});

// 3. Handle keypress (Enter key)
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});

// 4. Handle Delete and Checkbox clicks using Event Delegation
todoList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const todoId = Number(li.dataset.id);

  // Checkbox toggle
  if (e.target.classList.contains("todo-check")) {
    todos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );
    renderTodos();
  }

  // Delete button click
  if (e.target.classList.contains("delete-btn")) {
    todos = todos.filter((todo) => todo.id !== todoId);
    renderTodos();
  }
});
