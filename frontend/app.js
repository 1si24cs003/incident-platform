const BACKEND = "https://incident-backend-57n2.onrender.com";
const API = `${BACKEND}/api/incidents`;
const socket = io(BACKEND);

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(i => {
    list.innerHTML += `
      <div class="card">
        <b>${i.type}</b> - ${i.description}<br>
        <span class="badge">${i.status}</span>
        ${i.verified ? "<span class='verified'>✔ Verified</span>" : ""}
      </div>
    `;
  });
}

async function report() {
  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: type.value,
      description: desc.value,
      latitude: lat.value,
      longitude: lng.value,
      severity: "Medium"
    })
  });
}

socket.on("newIncident", load);
socket.on("updateIncident", load);
load();
