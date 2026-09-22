// 1. Mengambil elemen HTML
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

const allButton = document.getElementById("allButton");
const completedButton = document.getElementById("completedButton");
const activeButton = document.getElementById("activeButton");

// 2. Mengambil data dari localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 3. Filter yang sedang digunakan
let currentFilter = "all";

// 4. Fungsi menyimpan 
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 5. Fungsi menampilkan tugas
function renderTasks() {
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });
    }

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });
    }

//tampilkan semua
        filteredTasks.forEach(function(task) {

        const li = document.createElement("li");
        const taskSpan = document.createElement("span");

        taskSpan.textContent = task.text;

        if (task.completed === true) {
            taskSpan.style.textDecoration = "line-through";
        }

        taskSpan.addEventListener("click", function() {

            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Hapus";

        deleteButton.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// 6. Tombol Tambah
addButton.addEventListener("click", function() {
    const taskText = taskInput.value;

    if (taskText === "") {
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
});

// 7. Filter ALL
allButton.addEventListener("click", function() {
    currentFilter = "all";
    renderTasks();
});

// 8. Filter COMPLETED
completedButton.addEventListener("click", function() {
    currentFilter = "completed";
    renderTasks();
});

// 9. Filter ACTIVE
activeButton.addEventListener("click", function() {
    currentFilter = "active";
    renderTasks();
});

// 10. Tampilkan tugas saat halaman dibuka
renderTasks();