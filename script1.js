// Task Array and Local Storage Handling
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize To-Do List
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed-task' : ''}">${task.text}</span>
            <div>
                <button class="btn btn-sm btn-success" onclick="toggleTask(${index})">Complete</button>
                <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });

    updateTaskCounter();
}

// Add New Task
document.getElementById('add-task').addEventListener('click', function () {
    const taskInput = document.getElementById('task-input');
    if (taskInput.value.trim() !== '') {
        tasks.push({ text: taskInput.value, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
});

// Toggle Complete Task
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Edit Task
function editTask(index) {
    const newTaskText = prompt('Edit Task:', tasks[index].text);
    if (newTaskText) {
        tasks[index].text = newTaskText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Task Counter
function updateTaskCounter() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const remainingTasks = totalTasks - completedTasks;
    document.getElementById('task-counter').textContent = `Total Tasks: ${totalTasks} | Completed: ${completedTasks} | Remaining: ${remainingTasks}`;
}

// Filter Tasks
document.getElementById('filter-all').addEventListener('click', renderTasks);
document.getElementById('filter-active').addEventListener('click', function () {
    const filteredTasks = tasks.filter(task => !task.completed);
    displayFilteredTasks(filteredTasks);
});

document.getElementById('filter-completed').addEventListener('click', function () {
    const filteredTasks = tasks.filter(task => task.completed);
    displayFilteredTasks(filteredTasks);
});

function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed-task' : ''}">${task.text}</span>
            <div>
                <button class="btn btn-sm btn-success" onclick="toggleTask(${index})">Complete</button>
                <button class="btn btn-sm btn-warning" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Dark Mode/Light Mode Toggle
document.getElementById('toggle-mode').addEventListener('click', function () {
    const body = document.body;
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    const modeText = body.classList.contains('dark-mode') ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    document.getElementById('toggle-mode').textContent = modeText;
});

// Render Tasks on Page Load
renderTasks();

// Display Current Date and Time
setInterval(function () {
    const now = new Date();
    document.getElementById('date-time').textContent = now.toLocaleString();
}, 1000);




// ####################

