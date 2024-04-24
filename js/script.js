// Seleção de Elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

// Funcões
const saveTodo = (text) => {
    // Cria um elemento de div para representar a tarefa
    const todo = document.createElement("div");
    todo.classList.add("todo");

    // Cria um elemento de título para a tarefa
    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    // Cria um botão para marcar a tarefa como concluída
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    // Cria um botão para editar a tarefa
    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    // Cria um botão para remover a tarefa
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    
    todoList.appendChild(todo); // Adiciona a tarefa à lista de tarefas
    todoInput.value = ""; // Limpa o campo de entrada
    todoInput.focus(); // Volta a seleção para o campo de digitação
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio do formulário
    
    const inputValue = todoInput.value; // Obtém o valor do campo de entrada
    
    if(inputValue) {
        saveTodo(inputValue); // Salva a tarefa na lista
    }
});