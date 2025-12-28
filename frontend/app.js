const API = "https://incident-backend-57n2.onrender.com/api/incidents";
const socket = io("https://incident-backend-57n2.onrender.com");

let map = L.map("map").setView([20, 78], 4);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let markers = [];

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  document.getElementById("list").innerHTML = "";
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  data.forEach(i => {
    // List
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${i.type}</b> - ${i.description}<br>
      Severity: ${i.severity || "Medium"}<br>
      Status: ${i.status}
    `;
    document.getElementById("list").appendChild(li);

    // Map
    if (i.latitude && i.longitude) {
      const marker = L.marker([i.latitude, i.longitude])
        .addTo(map)
        .bindPopup(`<b>${i.type}</b><br>${i.description}`);
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
      longitude: lng.value,
      severity: "Medium"
    })
  });

  desc.value = "";
  lat.value = "";
  lng.value = "";
}

socket.on("newIncident", load);
socket.on("updateIncident", load);

load();
