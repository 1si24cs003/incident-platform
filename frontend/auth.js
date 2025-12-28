function login() {
  const role = document.getElementById("role").value;
  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (role === "admin" && user === "admin" && pass === "admin123") {
    window.location.href = "admin.html";
  } 
  else if (role === "agent" && user === "agent" && pass === "agent123") {
    window.location.href = "agent.html";
  } 
  else if (role === "responder" && user === "responder" && pass === "responder123") {
    window.location.href = "responder.html";
  } 
  else {
    alert("Invalid credentials");
  }
}
