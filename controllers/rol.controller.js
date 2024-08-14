const Rol = require('../models/rol.model');
const { StatusCodes } = require('http-status-codes');

const getAllRols = async (req, res) => {
  const roles = await Rol.find().sort('name');
  res.status(StatusCodes.OK).json({roles});
}

module.exports = {
  getAllRols,
}