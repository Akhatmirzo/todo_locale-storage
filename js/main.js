// ? Local Storage
// ? setItem
// localStorage.setItem("user", "Akhatmirzo");
// localStorage.setItem("user2", "Akhatmirzo");
// localStorage.setItem("user3", "Akhatmirzo");

// ? getItem
// const user = localStorage.getItem("user");
// console.log(user);

// ? removeItem
// localStorage.removeItem("user");

// ? clear
// localStorage.clear();

// Todo Project
const todoForm = document.querySelector("#todoForm");
const todosListEl = document.querySelector("#todosList");
const completedTodosListEl = document.querySelector("#completedTodos");

let todos = [];
const localTodosJSON = localStorage.getItem("LocalTodos");
const todoData = JSON.parse(localTodosJSON);
if (todoData) {
    todos = todoData;
}else {
    todos = [];
}

renderTodos(todos);

todoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // get value form inputs
    const taskInput = event.target[0];
    const timeInput = event.target[1];

    // Current date
    const date = new Date();

    // Creating todo object
    const todo = {
        id: todos.length,
        task: taskInput.value,
        time: timeInput.value.split("T").join(" "),
        completed: false,
        isEditing: false,
        createAt: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate}}`
    }

    // Add todo to todos array
    todos.push(todo);
    console.log(todos);
    localStorage.setItem('LocalTodos', JSON.stringify(todos));

    // Make inputs empty
    taskInput.value = "";
    timeInput.value = "";

    renderTodos(todos);
})

function renderTodos(todos) {
    todosListEl.innerHTML = "";
    completedTodosListEl.innerHTML = "";

    todos.forEach((todo, id) => {
        const template = todo.isEditing ? `
        <li class="list-group-item d-flex justify-content-between " ondblclick="editTodo('${id}', 'isEditing')">
            <div class="d-flex ">
                <input type="text" id="editInput" class="rounded-0 border border-1 ps-2 " value="${todo.task}">
                <button class="btn btn-primary rounded-0 " onclick="editTodo('${id}', 'editTask')">save</button>
            </div>

            <div class="actions">
                ${todo.completed ? `
                    <button class="btn btn-success " onclick="editTodo('${id}', 'completed')">Not</button>
                    ` : `
                    <button class="btn btn-success " onclick="editTodo('${id}', 'completed')">Done</button>
                    `
                }
                <button class="btn btn-danger " onclick="deleteTodo('${id}')">Delete</button>
            </div>
        </li>
        ` : `
        <li class="list-group-item d-flex justify-content-between " ondblclick="editTodo('${id}', 'isEditing')">
            <span>${todo.task}</span>
            <span>${todo.time}</span>
        </li>
        `

        if (todo.completed) {
            completedTodosListEl.innerHTML += template;
        } else {
            todosListEl.innerHTML += template;
        }
    });
}

function editTodo(id, type) {
    todos.map((todo) => {
        todo.isEditing ? todo.isEditing = false : '';
    })

    const editInput = document.getElementById('editInput');
    const newTodos = todos.map((todo, index) => {
        if (id == index) {
            todo[type] = !todo[type];

            if (type == 'completed' && todo.isEditing) {
                todo.isEditing = false;
            }

            if (type == 'editTask') {
                todo.task = editInput.value;
                todo.isEditing = false;
            }
            return todo;
        } else {
            return todo;
        }
    })

    todos = newTodos;
    localStorage.setItem('LocalTodos', JSON.stringify(todos));
    renderTodos(todos);
}

function deleteTodo(id) {
    let newTodo = [];
    todos.forEach((todo, index) => {
        if (id != index) {
            newTodo.push(todo);
        }
    });
    todos = newTodo;
    localStorage.setItem('LocalTodos', JSON.stringify(todos));
    console.log(todos);
    renderTodos(todos);
}


if("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("/serviceWorker.js")
    })
}