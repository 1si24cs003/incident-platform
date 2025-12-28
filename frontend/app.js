const API = "https://incident-backend-57n2.onrender.com/api/incidents";
const socket = io("https://incident-backend-57n2.onrender.com");

// Initialize map
let map = L.map("map").setView([20, 78], 4);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

let markers = [];

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  const list = document.getElementById("list");
  list.innerHTML = "";

  // Clear old markers
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  data.forEach(i => {
    // VERIFIED STATUS
    const verifiedText = i.verified
      ? `<span style="color:green;font-weight:bold;">✔ Verified</span>`
      : `<span style="color:red;font-weight:bold;">✖ Not Verified</span>`;

    // INCIDENT LIST
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${i.type}</b> – ${i.description}<br>
      <b>Severity:</b> ${i.severity || "Medium"}<br>
      <b>Status:</b> ${i.status}<br>
      <b>Verification:</b> ${verifiedText}
      <hr>
    `;
    list.appendChild(li);

    // MAP MARKERS
    if (i.latitude && i.longitude) {
      const marker = L.marker([i.latitude, i.longitude])
        .addTo(map)
        .bindPopup(`
          <b>${i.type}</b><br>
          ${i.description}<br>
          ${verifiedText}
        `);

      markers.push(marker);
    }
  });
}

// REPORT INCIDENT
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

// REAL-TIME UPDATES
socket.on("newIncident", load);
socket.on("updateIncident", load);

// INITIAL LOAD
load();
