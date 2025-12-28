const API = "https://incident-backend-57n2.onrender.com/api/incidents";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(i => {
    list.innerHTML += `
      <div class="card admin">
        <b>${i.type}</b> (${i.severity})<br>
        ${i.description}<br>
        Assigned: ${i.assignedResponder || "None"}<br><br>

        <input placeholder="Responder name" id="r${i._id}">
        <button onclick="assign('${i._id}')">Assign</button>
        <button onclick="verify('${i._id}')">Verify</button>
      </div>
    `;
  });
}

async function assign(id) {
  const name = document.getElementById("r" + id).value;
  await fetch(`${API}/${id}/assign`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responder: name })
  });
  load();
}

async function verify(id) {
  await fetch(`${API}/${id}/verify`, { method: "PATCH" });
  load();
}

load();
