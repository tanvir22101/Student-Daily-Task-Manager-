
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task first!");
        return;
    }

    const newTask = document.createElement("li");

    // Create the checkbox and task label
    const taskLabel = document.createElement("label");
    taskLabel.className = "task-label";

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";

    // Create the task information area
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    const taskName = document.createElement("span");
    taskName.textContent = taskText;

    const statusText = document.createElement("small");
    statusText.textContent = "Completed";
    statusText.className = "status-text";
    statusText.hidden = true;

    // Handle completed status
    completedCheckbox.addEventListener("change", function () {
        const isCompleted = completedCheckbox.checked;

        taskName.classList.toggle("completed", isCompleted);
        statusText.hidden = !isCompleted;
    });

    taskInfo.appendChild(taskName);
    taskInfo.appendChild(statusText);

    taskLabel.appendChild(completedCheckbox);
    taskLabel.appendChild(taskInfo);

    // Create a container for action buttons
    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    // Create the Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";

    editBtn.addEventListener("click", function () {

        const updatedText = prompt(
            "Edit your task:",
            taskName.textContent
        );

        if (updatedText === null) {
            return;
        }

        const newText = updatedText.trim();

        if (newText === "") {
            alert("Task cannot be empty!");
            return;
        }

        taskName.textContent = newText;
    });

    // Create the Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
        newTask.remove();
    });

    // Put both buttons together
    taskActions.appendChild(editBtn);
    taskActions.appendChild(deleteBtn);

    // Build the complete task
    newTask.appendChild(taskLabel);
    newTask.appendChild(taskActions);

    taskList.appendChild(newTask);

    taskInput.value = "";
    taskInput.focus();

});
