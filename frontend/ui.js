function goHome() {
  window.location.href = "index.html";
}

function logout() {
  alert("Logged out");
  window.location.href = "index.html";
}

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}

function toggleDark() {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
}

if (localStorage.getItem("dark") === "true") {
  document.body.classList.add("dark");
}
