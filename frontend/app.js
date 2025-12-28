const API = "https://your-backend-url/api/incidents";
const socket = io("https://your-backend-url");

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  render(data);
}

function render(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";
  data.forEach(i => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${i.type}</b> - ${i.description}<br>
      Severity: ${i.severity || "Medium"}<br>
      Status: ${i.status}<br>
      Verified: ${i.verified}
      <button onclick="verify('${i._id}')">Verify</button>
    `;
    list.appendChild(li);
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

async function verify(id) {
  await fetch(`${API}/${id}/verify`, { method: "PATCH" });
}

socket.on("newIncident", load);
socket.on("updateIncident", load);

load();
