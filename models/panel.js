const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const panelSchema = new Schema({
  material: { type: String, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
  thickness: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Panel = mongoose.model("Panel", panelSchema);

module.exports = Panel;