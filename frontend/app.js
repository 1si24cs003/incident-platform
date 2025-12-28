// 🔥 CHANGE NOTHING EXCEPT BACKEND URL IF IT EVER CHANGES
const BACKEND_URL = "https://incident-backend-57n2.onrender.com";
const API = `${BACKEND_URL}/api/incidents`;

// Socket.IO connection
const socket = io(BACKEND_URL);

// Load incidents on page load
async function load() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error("Failed to load incidents:", err);
  }
}

// Render incidents
function render(data) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(i => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${i.type}</b><br>
      ${i.description}<br>
      <small>
        Severity: ${i.severity || "Medium"} |
        Status: ${i.status} |
        Verified: ${i.verified}
      </small><br><br>
      <button onclick="verify('${i._id}')">Verify</button>
    `;
    list.appendChild(li);
  });
}

// Report new incident
async function report() {
  try {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: document.getElementById("type").value,
        description: document.getElementById("desc").value,
        latitude: document.getElementById("lat").value,
        longitude: document.getElementById("lng").value,
        severity: "Medium"
      })
    });
  } catch (err) {
    console.error("Failed to report incident:", err);
  }
}

// Verify incident
async function verify(id) {
  try {
    await fetch(`${API}/${id}/verify`, {
      method: "PATCH"
    });
  } catch (err) {
    console.error("Failed to verify incident:", err);
  }
}

// Real-time updates
socket.on("newIncident", load);
socket.on("updateIncident", load);

// Initial load
load();
