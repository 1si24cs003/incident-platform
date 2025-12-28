const role = localStorage.getItem("role");
const name = localStorage.getItem("name");

function requireLogin(requiredRole) {
  if (!role || !name) {
    alert("Please login first");
    window.location.href = "login.html";
  }
  if (requiredRole && role !== requiredRole) {
    alert("Access denied");
    window.location.href = "index.html";
  }
}

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function toggleDark() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}
