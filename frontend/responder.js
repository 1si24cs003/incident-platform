const API = "https://incident-backend-57n2.onrender.com/api/incidents";
const RESPONDER = "responder";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  list.innerHTML = "";

  data.filter(i => i.assignedResponder === RESPONDER).forEach(i => {
    list.innerHTML += `
      <div class="card responder">
        <b>${i.type}</b><br>
        ${i.description}<br>
        Status: ${i.status}<br><br>

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
