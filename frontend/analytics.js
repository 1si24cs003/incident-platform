const API = "https://incident-backend-57n2.onrender.com/api/incidents";

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  const total = data.length;
  const high = data.filter(i => i.severity === "High").length;
  const verified = data.filter(i => i.verified).length;

  document.getElementById("stats").innerHTML = `
    <h3>Total Incidents: ${total}</h3>
    <h3>High Severity: ${high}</h3>
    <h3>Verified: ${verified}</h3>
  `;
}

load();
