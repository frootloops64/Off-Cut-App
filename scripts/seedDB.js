const mongoose = require("mongoose");
const db = require("../models");

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/offCuts"
);

const panelSeed = [
  {
    material: "Polycarbonate",
    length: 1220,
    width: 1220,
    thickness: 3,
    date: new Date(Date.now()).valueOf() / 1000
  },
  {
    material: "Polycarbonate",
    length: 800,
    width: 500,
    thickness: 3,
    date: new Date(Date.now()).valueOf() / 1000
  },
  {
    material: "Polycarbonate",
    length: 1000,
    width: 1000,
    thickness: 3,
    date: new Date(Date.now()).valueOf() / 1000
  },
  {
    material: "Polycarbonate",
    length: 2000,
    width: 200,
    thickness: 3,
    date: new Date(Date.now()).valueOf() / 1000
  },
  {
    material: "Polycarbonate",
    length: 2440,
    width: 600,
    thickness: 3,
    date: new Date(Date.now()).valueOf() / 1000
  }
];

db.Panel
  .remove({})
  .then(() => db.Panel.collection.insertMany(panelSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });