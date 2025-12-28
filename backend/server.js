const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const IncidentSchema = new mongoose.Schema({
  type: String,
  description: String,
  latitude: String,
  longitude: String,
  severity: String,
  status: { type: String, default: "Reported" },
  verified: { type: Boolean, default: false },
  assignedAgent: { type: String, default: "" },
  assignedResponder: { type: String, default: "" }
});

const Incident = mongoose.model("Incident", IncidentSchema);

/* ================= ROUTES ================= */

// Get all
app.get("/api/incidents", async (req, res) => {
  const incidents = await Incident.find();
  res.json(incidents);
});

// Create
app.post("/api/incidents", async (req, res) => {
  const incident = await Incident.create(req.body);
  io.emit("newIncident");
  res.json(incident);
});

// Verify
app.patch("/api/incidents/:id/verify", async (req, res) => {
  await Incident.findByIdAndUpdate(req.params.id, { verified: true });
  io.emit("updateIncident");
  res.json({ success: true });
});

// Assign agent
app.patch("/api/incidents/:id/assign-agent", async (req, res) => {
  await Incident.findByIdAndUpdate(req.params.id, {
    assignedAgent: req.body.agent
  });
  io.emit("updateIncident");
  res.json({ success: true });
});

// Assign responder
app.patch("/api/incidents/:id/assign-responder", async (req, res) => {
  await Incident.findByIdAndUpdate(req.params.id, {
    assignedResponder: req.body.responder
  });
  io.emit("updateIncident");
  res.json({ success: true });
});

// Update status
app.patch("/api/incidents/:id/status", async (req, res) => {
  await Incident.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });
  io.emit("updateIncident");
  res.json({ success: true });
});

// DELETE (FIXED ISSUE 🔥)
app.delete("/api/incidents/:id", async (req, res) => {
  await Incident.findByIdAndDelete(req.params.id);
  io.emit("updateIncident");
  res.json({ message: "Incident deleted" });
});

/* ========================================== */

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server running on port", PORT));
