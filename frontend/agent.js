const API = "https://incident-backend-57n2.onrender.com/api/incidents";
const AGENT = "agent";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  list.innerHTML = "";

  data.filter(i => i.assignedAgent === AGENT).forEach(i => {
    list.innerHTML += `
      <div class="card">
        <b>${i.type}</b><br>
        ${i.description}<br>
        Status: ${i.status}<br>
        Responder: ${i.assignedResponder || "None"}<br><br>

        <input id="r${i._id}" placeholder="Responder username">
        <button onclick="assignResponder('${i._id}')">Assign Responder</button>

        <button onclick="remove('${i._id}')">Delete (after completion)</button>
      </div>
    `;
  });
}

async function assignResponder(id) {
  const responder = document.getElementById("r" + id).value;
  await fetch(`${API}/${id}/assign-responder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responder })
  });
  load();
}

async function remove(id) {
  if (confirm("Delete completed incident?")) {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  }
}

load();
