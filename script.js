let tasks = [];

function addTask() {
  const title = document.getElementById("taskTitle").value.trim();
  const date = document.getElementById("taskDate").value;
  const recurrence = document.getElementById("recurrence").value;

  if (!title || !date) {
    alert("Please enter both title and date!");
    return;
  }

  const task = {
    title,
    date: new Date(date),
    recurrence
  };

  tasks.push(task);
  displayTasks();
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("recurrence").value = "none";
}

// Display tasks
function displayTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = `${task.title} – ${task.date.toLocaleString()} (${task.recurrence})`;
    list.appendChild(li);
  });
}

// Simulated notification check every 5 seconds
setInterval(() => {
  const now = new Date();
  tasks.forEach((task) => {
    const diff = Math.abs(now - task.date);
    if (diff < 5000) {
      showNotification(`Reminder: ${task.title} is scheduled now!`);

      // Simulate recurrence
      if (task.recurrence === "daily") task.date.setDate(task.date.getDate() + 1);
      if (task.recurrence === "weekly") task.date.setDate(task.date.getDate() + 7);
      if (task.recurrence === "monthly") task.date.setMonth(task.date.getMonth() + 1);
    }
  });
}, 5000);

// Show notification
function showNotification(msg) {
  const notif = document.getElementById("notifications");
  notif.textContent = msg;
  notif.style.display = "block";

  setTimeout(() => {
    notif.style.display = "none";
  }, 3000);
}
