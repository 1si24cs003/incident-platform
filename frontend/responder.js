const API = "https://incident-backend-57n2.onrender.com/api/incidents";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.filter(i => i.verified).forEach(i => {
    list.innerHTML += `
      <div class="card responder">
        <b>${i.type}</b><br>
        ${i.description}<br>
        Status: ${i.status}
        <br><br>
        <button onclick="update('${i._id}')">Mark In Progress</button>
      </div>
    `;
  });
}

async function update(id) {
  await fetch(`${API}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "In Progress" })
  });
  load();
}

load();
