// ambil elemen dari HTML
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");


// ambil data dari localStorage
const savedTasks = localStorage.getItem("tasks");

let tasks = savedTasks ? JSON.parse(savedTasks) : [];

let currentFilter = "all";


// simpan data
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// tampilkan tugas
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // filter tugas yang belum selesai
    if (currentFilter === "active") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });
    }

    // filter tugas yang sudah selesai
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });
    }

    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = task.text;

        // coret tugas yang sudah selesai
        if (task.completed === true) {
            taskSpan.classList.add("completed");
        }

        // klik tugas untuk mengubah status
        taskSpan.addEventListener("click", function() {

            const taskIndex = tasks.indexOf(task);

            tasks[taskIndex].completed = !tasks[taskIndex].completed;

            saveTasks();
            renderTasks();
        });


        // tombol hapus
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            const taskIndex = tasks.indexOf(task);

            tasks.splice(taskIndex, 1);

            saveTasks();
            renderTasks();
        });


        li.appendChild(taskSpan);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}


// tambah tugas
addButton.addEventListener("click", function() {

    const taskText = taskInput.value.trim();

    // jangan tambah kalau kosong
    if (taskText === "") {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    taskInput.value = "";

    renderTasks();
});


// filter semua tugas
allButton.addEventListener("click", function() {

    currentFilter = "all";

    updateFilterButton();
    renderTasks();
});


// filter tugas yang belum selesai
activeButton.addEventListener("click", function() {

    currentFilter = "active";

    updateFilterButton();
    renderTasks();
});


// filter tugas yang sudah selesai
completedButton.addEventListener("click", function() {

    currentFilter = "completed";

    updateFilterButton();
    renderTasks();
});


// ubah tombol filter yang aktif
function updateFilterButton() {

    allButton.classList.remove("active-filter");
    activeButton.classList.remove("active-filter");
    completedButton.classList.remove("active-filter");

    if (currentFilter === "all") {
        allButton.classList.add("active-filter");
    }

    if (currentFilter === "active") {
        activeButton.classList.add("active-filter");
    }

    if (currentFilter === "completed") {
        completedButton.classList.add("active-filter");
    }
}

// tampilkan tugas saat halaman dibuka
renderTasks();