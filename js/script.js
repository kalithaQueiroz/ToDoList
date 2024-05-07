const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const editForm = document.getElementById('edit-form');
const editInput = document.getElementById('edit-input');
const cancelEditBtn = document.getElementById('cancel-edit-btn');
const searchInput = document.getElementById('search-input');
const filterSelect = document.getElementById('filter-select');
const eraseButton = document.getElementById('erase-button');

let todos = [];

// Add a new todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
        const newTodo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
});

// Edit a todo
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newText = editInput.value.trim();
    if (newText !== '') {
        const id = editForm.dataset.id;
        todos = todos.map(todo => {
            if (todo.id === parseInt(id)) {
                todo.text = newText;
            }
            return todo;
        });
        renderTodos();
        editForm.classList.add('hide');
    }
});

// Cancel editing
cancelEditBtn.addEventListener('click', () => {
    editForm.classList.add('hide');
});

// Toggle todo completion
function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    renderTodos();
}

// Edit todo
function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    editInput.value = todo.text;
    editForm.dataset.id = id;
    editForm.classList.remove('hide');
}

// Remove todo
function removeTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Render todos
function renderTodos() {
    const searchTextValue = searchInput.value.toLowerCase();
    const filterValue = filterSelect.value;

    const filteredTodos = todos.filter(todo => {
        const textMatch = todo.text.toLowerCase().includes(searchTextValue);
        if (filterValue === 'done') {
            return todo.completed && textMatch;
        } else if (filterValue === 'todo') {
            return !todo.completed && textMatch;
        } else {
            return textMatch;
        }
    });

    todoList.innerHTML = '';
    filteredTodos.forEach(todo => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        if (todo.completed) {
            todoDiv.classList.add('done');
        }
        todoDiv.innerHTML = `
            <h3>${todo.text}</h3>
            <button class="finish-todo">
                <i class="fa-solid fa-check"></i>
            </button>
            <button class="edit-todo">
                <i class="fa-solid fa-pen"></i>
            </button>
            <button class="remove-todo">
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;
        todoDiv.querySelector('.finish-todo').addEventListener('click', () => toggleComplete(todo.id));
        todoDiv.querySelector('.edit-todo').addEventListener('click', () => editTodo(todo.id));
        todoDiv.querySelector('.remove-todo').addEventListener('click', () => removeTodo(todo.id));
        todoList.appendChild(todoDiv);
    });
}

// Event listeners for search, erase, and filter
searchInput.addEventListener('input', renderTodos);
eraseButton.addEventListener('click', () => {
    searchInput.value = '';
    renderTodos();
});
filterSelect.addEventListener('change', renderTodos);

// Initial rendering
renderTodos();
