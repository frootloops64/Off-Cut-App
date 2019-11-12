const db = require("../models");

module.exports = {
  findAll: function(req, res) {
    db.Panel
      .find(req.query)
      .sort
  }
}