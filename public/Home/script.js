document.addEventListener('DOMContentLoaded', () => {
    const tasks = [];
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');
    let editingIndex = null;

    const renderTasks = () => {
        taskList.innerHTML = ''; 
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${task}</span>
                <div>
                    <button class="btn btn-sm btn-warning me-2" onclick="editTask(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(listItem);
        });
    };

    window.editTask = (index) => {
        taskInput.value = tasks[index];
        editingIndex = index;
    };

    window.deleteTask = (index) => {
        tasks.splice(index, 1);
        renderTasks();
    };

    addTaskBtn.addEventListener('click', () => {
        const taskValue = taskInput.value.trim();
        if (taskValue === '') return;

        if (editingIndex !== null) {
            tasks[editingIndex] = taskValue;
            editingIndex = null; 
        } else {
            tasks.push(taskValue);
        }
        taskInput.value = ''; 
        renderTasks(); 
    });
});
