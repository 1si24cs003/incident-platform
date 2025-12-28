const API = "https://incident-backend-57n2.onrender.com/api/incidents";

/*
 IMPORTANT:
 This MUST match the username used to login as agent
 Login credentials:
   role: agent
   username: agent
   password: agent123
*/
const AGENT_USERNAME = "agent";

async function load() {
  try {
    const res = await fetch(API);
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    const assigned = data.filter(
      i => i.assignedAgent === AGENT_USERNAME
    );

    if (assigned.length === 0) {
      list.innerHTML = "<p>No incidents assigned to you.</p>";
      return;
    }

    assigned.forEach(i => {
      list.innerHTML += `
        <div class="card responder">
          <b>${i.type}</b> (${i.severity})<br>
          ${i.description}<br><br>

          <b>Status:</b> ${i.status}<br>
          <b>Responder:</b> ${i.assignedResponder || "Not assigned"}<br><br>

          <input id="r${i._id}" placeholder="Responder username">

          <button onclick="assignResponder('${i._id}')">
            Assign Responder
          </button>

          <button onclick="deleteIncident('${i._id}')">
            Delete (after completion)
          </button>
        </div>
      `;
    });

  } catch (err) {
    console.error("Agent load failed:", err);
  }
}

async function assignResponder(id) {
  const responder = document.getElementById("r" + id).value;

  if (!responder) {
    alert("Enter responder username");
    return;
  }

  await fetch(`${API}/${id}/assign-responder`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responder })
  });

  load();
}

async function deleteIncident(id) {
  if (!confirm("Delete this completed incident permanently?")) return;

  await fetch(`${API}/${id}`, { method: "DELETE" });
  load();
}

load();
