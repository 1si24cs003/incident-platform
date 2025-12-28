const express = require("express");
const Incident = require("../models/Incident");

function calculateSeverity(type, description) {
  const text = (type + " " + description).toLowerCase();

  if (text.includes("fire") || text.includes("death") || text.includes("accident"))
    return "High";

  if (text.includes("medical") || text.includes("injury"))
    return "Medium";

  return "Low";
}

module.exports = (io) => {
  const router = express.Router();

  // CREATE INCIDENT
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

  // VERIFY
  router.patch("/:id/verify", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  // UPDATE STATUS
  router.patch("/:id/status", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  // ASSIGN RESPONDER
  router.patch("/:id/assign", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { assignedResponder: req.body.responder },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  return router;
};
