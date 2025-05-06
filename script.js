let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all"

function addTask()
{
    const input=document.getElementById("taskInput")
    console.log(input.value)
    const text=input.value.trim()
    if (!text) 
    return
    const task={
        text: text,
        completed: false,
        }
    console.log(task)
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value=""
    renderTask()
}
function renderTask()
{
    const list = document.getElementById("taskList")
    list.innerHTML = ""
    tasks
    .filter(task => {
      if (currentFilter === "all") return true;
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      
    })
    .forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "task";
      if (task.completed) li.classList.add("completed");

      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})"
        <span>${task.text}</span>
        <button onclick="deleteTask(${index})">Delete</button>
      `;
      list.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask();
  }

function setFilter(filter) {
    currentFilter = filter;
    renderTask();
  }
  
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask();
  }

renderTask()
  
  
  