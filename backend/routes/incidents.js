const express = require("express");
const Incident = require("../models/Incident");

module.exports = (io) => {
  const router = express.Router();

  router.post("/", async (req, res) => {
    const incident = new Incident(req.body);
    await incident.save();
    io.emit("newIncident", incident);
    res.json(incident);
  });

  router.get("/", async (req, res) => {
    const incidents = await Incident.find().sort({ createdAt: -1 });
    res.json(incidents);
  });

  router.patch("/:id/verify", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  router.patch("/:id/status", async (req, res) => {
    const incident = await Incident.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    io.emit("updateIncident", incident);
    res.json(incident);
  });

  return router;
};
