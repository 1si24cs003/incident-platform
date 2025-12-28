function login() {
  const role = roleSelect.value;
  const user = userInput.value;
  const pass = passInput.value;

  if (role === "admin" && user === "admin" && pass === "admin123")
    location.href = "admin.html";

  else if (role === "agent" && user === "agent" && pass === "agent123")
    location.href = "agent.html";

  else if (role === "responder" && user === "responder" && pass === "responder123")
    location.href = "responder.html";

  else alert("Invalid credentials");
}
