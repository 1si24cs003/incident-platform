const API = "https://incident-backend-57n2.onrender.com/api/incidents";

async function load() {
  const res = await fetch(API);
  const data = await res.json();
  const list = document.getElementById("list");
  list.innerHTML = "";

  data.forEach(i => {
    list.innerHTML += `
      <div class="card admin">
        <b>${i.type}</b> - ${i.description}<br>
        Status: ${i.status}<br>
        Verified: ${i.verified}
        <br><br>
        <button onclick="verify('${i._id}')">Verify</button>
        <button onclick="status('${i._id}','Resolved')">Resolve</button>
      </div>
    `;
  });
}

async function verify(id) {
  await fetch(`${API}/${id}/verify`, { method: "PATCH" });
  load();
}

async function status(id, s) {
  await fetch(`${API}/${id}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: s })
  });
  load();
}

load();
