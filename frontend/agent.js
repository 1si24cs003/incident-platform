const API = "https://incident-backend-57n2.onrender.com/api/incidents";
const AGENT = prompt("Enter Agent Name:");

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.filter(i => i.assignedAgent === AGENT).forEach(i => {
    list.innerHTML += `
      <div class="card">
        <b>${i.type}</b><br>
        ${i.description}<br>
        Status: ${i.status}<br>
        Responder: ${i.assignedResponder || "None"}<br><br>

        <input id="resp${i._id}" placeholder="Responder name">
        <button onclick="assign('${i._id}')">Assign Responder</button>
        <button onclick="del('${i._id}')">Delete After Completion</button>
      </div>
    `;
  });
}

async function assign(id) {
  const responder = document.getElementById("resp" + id).value;
  await fetch(`${API}/${id}/assign-responder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responder })
  });
  load();
}

async function del(id) {
  if (!confirm("Delete completed incident?")) return;
  await fetch(`${API}/${id}`, { method: "DELETE" });
  load();
}

load();
