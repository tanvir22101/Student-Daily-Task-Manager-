
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load previously saved tasks
let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];

// Save tasks in browser storage
function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

// Display all tasks on the webpage
function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const newTask = document.createElement("li");

        // Create checkbox and task information
        const taskLabel = document.createElement("label");
        taskLabel.className = "task-label";

        const completedCheckbox = document.createElement("input");
        completedCheckbox.type = "checkbox";
        completedCheckbox.checked = task.completed;

        const taskInfo = document.createElement("div");
        taskInfo.className = "task-info";

        const taskName = document.createElement("span");
        taskName.textContent = task.text;
        taskName.classList.toggle("completed", task.completed);

        const statusText = document.createElement("small");
        statusText.textContent = "Completed";
        statusText.className = "status-text";
        statusText.hidden = !task.completed;

        // Update completed status
        completedCheckbox.addEventListener("change", function () {
            task.completed = completedCheckbox.checked;
            saveTasks();
            renderTasks();
        });

        taskInfo.appendChild(taskName);
        taskInfo.appendChild(statusText);

        taskLabel.appendChild(completedCheckbox);
        taskLabel.appendChild(taskInfo);

        // Create Edit and Delete buttons
        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.addEventListener("click", function () {
            const updatedText = prompt("Edit your task:", task.text);

            if (updatedText === null) {
                return;
            }

            const newText = updatedText.trim();

            if (newText === "") {
                alert("Task cannot be empty!");
                return;
            }

            task.text = newText;
            saveTasks();
            renderTasks();
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", function () {
            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        taskActions.appendChild(editBtn);
        taskActions.appendChild(deleteBtn);

        // Assemble the task box
        newTask.appendChild(taskLabel);
        newTask.appendChild(taskActions);

      
        taskList.appendChild(newTask);
    });

    // Calculate task statistics
    const totalCount = tasks.length;

    const completedCount = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pendingCount = totalCount - completedCount;

    // Update dashboard numbers
    document.getElementById("totalTasks").textContent = totalCount;

    document.getElementById("completedTasks").textContent = completedCount;

    document.getElementById("pendingTasks").textContent = pendingCount;
}


// Add a new task
addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task first!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
});

// Display saved tasks when the page opens
renderTasks();
