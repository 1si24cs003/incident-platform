const API = "https://incident-backend-57n2.onrender.com/api/incidents";

// agent chooses name manually
const AGENT_NAME = prompt("Enter your agent name:");

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  const myIncidents = data.filter(i => i.assignedAgent === AGENT_NAME);

  if (myIncidents.length === 0) {
    list.innerHTML = "<p>No incidents assigned to this agent.</p>";
    return;
  }

  myIncidents.forEach(i => {
    list.innerHTML += `
      <div class="card">
        <b>${i.type}</b> (${i.severity})<br>
        ${i.description}<br><br>

        <b>Status:</b> ${i.status}<br>
        <b>Responder:</b> ${i.assignedResponder || "Not assigned"}<br><br>

        <input id="resp${i._id}" placeholder="Enter responder name">
        <button onclick="assignResponder('${i._id}')">Assign Responder</button>

        <button onclick="remove('${i._id}')">Delete after completion</button>
      </div>
    `;
  });
}

async function assignResponder(id) {
  const responder = document.getElementById("resp" + id).value.trim();
  if (!responder) {
    alert("Enter responder name");
    return;
  }

  await fetch(`${API}/${id}/assign-responder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responder })
  });

  load();
}

async function remove(id) {
  if (!confirm("Delete completed incident?")) return;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  load();
}

load();
