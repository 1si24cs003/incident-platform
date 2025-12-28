const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  type: String,
  description: String,
  latitude: Number,
  longitude: Number,
  severity: String,
  verified: { type: Boolean, default: false },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Incident", IncidentSchema);
