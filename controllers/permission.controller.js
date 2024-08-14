const Permission = require('../models/permission.model');
const { StatusCodes } = require('http-status-codes');

const getPermission = async(req, res) => {

  const { 
    params: {id : rol}
  } = req;

  const permission = await Permission.find({rol});

  res.status(StatusCodes.OK).json({ permission });
}

module.exports = {
  getPermission,
}