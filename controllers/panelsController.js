const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Panel
      .find(req.query)
      .sort({ length: 1})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Panel
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByData: function(req, res) {
    const {
      material,
      length,
      width,
      thickness
    } = res.body;

    db.Panel
      .where('material', material)
      .where('length').gte(length)
      .where('width').gte(width)
      .where('thickness').gte(thickness)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Panel
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Panel
      .findOneAndUpdate({ _id: req.params.id}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req,res) {
    db.Panel
      .findById({ _id: req.params.id})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};