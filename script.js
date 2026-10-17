
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

    // Create the checkbox
    const taskLabel = document.createElement("label");
    taskLabel.className = "task-label";

    const completedCheckbox = document.createElement("input");
    completedCheckbox.type = "checkbox";

    // Create a container for task name and status
    const taskInfo = document.createElement("div");
    taskInfo.className = "task-info";

    // Create the task name
    const taskName = document.createElement("span");
    taskName.textContent = taskText;

    // Create the Completed label
    const statusText = document.createElement("small");
    statusText.textContent = "Completed";
    statusText.className = "status-text";
    statusText.hidden = true;

    // Handle task completion
    completedCheckbox.addEventListener("change", function () {

        const isCompleted = completedCheckbox.checked;

        taskName.classList.toggle("completed", isCompleted);
        statusText.hidden = !isCompleted;

    });

    // Put the task name and status together
    taskInfo.appendChild(taskName);
    taskInfo.appendChild(statusText);

    taskLabel.appendChild(completedCheckbox);
    taskLabel.appendChild(taskInfo);

    // Create the Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", function () {
        newTask.remove();
    });

    // Add everything to the task box
    newTask.appendChild(taskLabel);
    newTask.appendChild(deleteBtn);

    taskList.appendChild(newTask);

    taskInput.value = "";
    taskInput.focus();

});
