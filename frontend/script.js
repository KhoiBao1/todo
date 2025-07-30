const API = "https://todo-cwpx.onrender.com/api/tasks";

async function fetchTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = `${task.description} (${task.status})`;
    const btn = document.createElement("button");
    btn.textContent = "✓";
    btn.onclick = () => updateTask(task._id);
    const del = document.createElement("button");
    del.textContent = "🗑";
    del.onclick = () => deleteTask(task._id);
    li.append(btn, del);
    list.appendChild(li);
  });
}

document.getElementById("taskForm").addEventListener("submit", async e => {
  e.preventDefault();
  const description = document.getElementById("description").value;
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description })
  });
  e.target.reset();
  fetchTasks();
});

async function updateTask(id) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" })
  });
  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();
