const express = require("express");
const Incident = require("../models/Incident");

function calculateSeverity(type, description) {
  const text = (type + " " + description).toLowerCase();

  if (text.includes("fire") || text.includes("accident") || text.includes("death"))
    return "High";
  if (text.includes("medical") || text.includes("injury"))
    return "Medium";
  return "Low";
}

module.exports = (io) => {
  const router = express.Router();

  // CREATE INCIDENT (PUBLIC)
  router.post("/", async (req, res) => {
    const severity = calculateSeverity(req.body.type, req.body.description);

    const incident = new Incident({
      ...req.body,
      severity
    });

    await incident.save();
    io.emit("newIncident", incident);
    res.json(incident);
  });

  // GET ALL
  router.get("/", async (req, res) => {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  });

  // ADMIN: VERIFY
  router.patch("/:id/verify", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  // ADMIN: ASSIGN AGENT
  router.patch("/:id/assign-agent", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      {
        assignedAgent: req.body.agent,
        status: "Agent Assigned"
      },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  // AGENT: ASSIGN RESPONDER
  router.patch("/:id/assign-responder", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      {
        assignedResponder: req.body.responder,
        status: "Responder Assigned"
      },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  // RESPONDER: UPDATE STATUS
  router.patch("/:id/status", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  // AGENT: DELETE AFTER COMPLETION
  router.delete("/:id", async (req, res) => {
    await Incident.findByIdAndDelete(req.params.id);
    io.emit("deleteIncident", req.params.id);
    res.json({ success: true });
  });

  return router;
};
