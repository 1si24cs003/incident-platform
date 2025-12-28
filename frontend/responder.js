const API = "https://incident-backend-57n2.onrender.com/api/incidents";

// responder enters name manually
const RESPONDER_NAME = prompt("Enter your responder name:");

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  const myJobs = data.filter(i => i.assignedResponder === RESPONDER_NAME);

  if (myJobs.length === 0) {
    list.innerHTML = "<p>No incidents assigned to this responder.</p>";
    return;
  }

  myJobs.forEach(i => {
    list.innerHTML += `
      <div class="card responder">
        <b>${i.type}</b> (${i.severity})<br>
        ${i.description}<br>
        <b>Status:</b> ${i.status}<br><br>

        <button onclick="update('${i._id}','In Progress')">In Progress</button>
        <button onclick="update('${i._id}','Completed')">Completed</button>
      </div>
    `;
  });
}

async function update(id, status) {
  await fetch(`${API}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  load();
}

load();
