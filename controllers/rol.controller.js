const Rol = require('../models/rol.model');

const getAllRols = async (req, res) => {
  const roles = await Rol.find().sort('name');
  res.status(200).json({roles});
}

module.exports = {
  getAllRols,
}