const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/"
);

const today = new Date()

const panelSeed = [
  {
    material: "Polycarbonate",
    length: 1220,
    width: 1220,
    thickness: 3,
    date: today.toDateString()
  },
  {
    material: "Polycarbonate",
    length: 800,
    width: 500,
    thickness: 3,
    date: today.toDateString()
  },
  {
    material: "Polycarbonate",
    length: 1000,
    width: 1000,
    thickness: 3,
    date: today.toDateString()
  },
  {
    material: "Polycarbonate",
    length: 2000,
    width: 200,
    thickness: 3,
    date: today.toDateString()
  },
  {
    material: "Polycarbonate",
    length: 2440,
    width: 600,
    thickness: 3,
    date: today.toDateString()
  }
]