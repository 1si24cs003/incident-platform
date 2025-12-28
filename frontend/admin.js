const API = "https://incident-backend-57n2.onrender.com/api/incidents";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(i => {
    const verifiedText = i.verified
      ? `<span style="color:green;font-weight:bold;">✔ Verified</span>`
      : `<span style="color:red;font-weight:bold;">✖ Not Verified</span>`;

    list.innerHTML += `
      <div class="card">
        <h3>${i.type}</h3>
        <p>${i.description}</p>

        <p><b>Status:</b> ${i.status}</p>
        <p><b>Verification:</b> ${verifiedText}</p>
        <p><b>Agent:</b> ${i.assignedAgent || "Not assigned"}</p>
        <p><b>Responder:</b> ${i.assignedResponder || "Not assigned"}</p>

        ${
          !i.verified
            ? `<button onclick="verify('${i._id}')">Verify Incident</button>`
            : `<button disabled style="background:#9ca3af;">Already Verified</button>`
        }

        <input id="agent${i._id}" placeholder="Assign agent name">
        <button onclick="assignAgent('${i._id}')">Assign Agent</button>
      </div>
    `;
  });
}

async function verify(id) {
  await fetch(`${API}/${id}/verify`, { method: "PATCH" });
  load();
}

async function assignAgent(id) {
  const agent = document.getElementById("agent" + id).value.trim();
  if (!agent) {
    alert("Enter agent name");
    return;
  }

  await fetch(`${API}/${id}/assign-agent`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ agent })
  });

  load();
}

load();
