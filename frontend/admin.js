const API = "https://incident-backend-57n2.onrender.com/api/incidents";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(i => {
    list.innerHTML += `
      <div class="card">
        <b>${i.type}</b> (${i.severity})<br>
        ${i.description}<br><br>

        Status: ${i.status}<br>
        Agent: ${i.assignedAgent || "None"}<br>
        Responder: ${i.assignedResponder || "None"}<br><br>

        <input id="agent${i._id}" placeholder="Agent name">
        <button onclick="assignAgent('${i._id}')">Assign Agent</button>
        <button onclick="verify('${i._id}')">Verify</button>
      </div>
    `;
  });
}

async function assignAgent(id) {
  const agent = document.getElementById("agent" + id).value;
  await fetch(`${API}/${id}/assign-agent`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent })
  });
  load();
}

async function verify(id) {
  await fetch(`${API}/${id}/verify`, { method: "PATCH" });
  load();
}

load();
