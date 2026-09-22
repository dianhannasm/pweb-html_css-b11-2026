const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", function() {
    const taskText = taskInput.value;

    if (taskText === "") {
        return;
    }

    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    taskSpan.addEventListener("click", function() {
        taskSpan.style.textDecoration = "line-through";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Hapus";

    deleteButton.addEventListener("click", function() {
        li.remove();
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
});