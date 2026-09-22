const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");

addButton.addEventListener("click", function() {
    const taskText = taskInput.value;
    console.log(taskText);
});