function requireLogin(requiredRole) {
  const role = localStorage.getItem("role");
  const loggedIn = localStorage.getItem("loggedIn");

  if (!loggedIn || !role) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
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
