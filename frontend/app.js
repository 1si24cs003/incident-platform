const BACKEND = "https://incident-backend-57n2.onrender.com";
const API = `${BACKEND}/api/incidents`;
const socket = io(BACKEND);

// INIT MAP
const map = L.map("map").setView([12.9716, 77.5946], 6);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
let markers = [];

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  document.getElementById("list").innerHTML = "";
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  data.forEach(i => {
    // UI
    document.getElementById("list").innerHTML += `
      <div class="card">
        <b>${i.type}</b> (${i.severity})<br>
        ${i.description}<br>
        Status: ${i.status}
      </div>
    `;

    // MAP
    if (i.latitude && i.longitude) {
      const marker = L.marker([i.latitude, i.longitude])
        .addTo(map)
        .bindPopup(`<b>${i.type}</b><br>${i.severity}`);
      markers.push(marker);
    }
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
      longitude: lng.value
    })
  });
}

socket.on("newIncident", load);
socket.on("updateIncident", load);
load();
