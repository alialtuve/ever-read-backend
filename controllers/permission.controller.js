const Permission = require('../models/permission.model');
const Rol = require('../models/rol.model');

const getPermission = async(req, res) => {

  const { 
    params: {id : rol}
  } = req;

  const permission = await Permission.find({rol});

  res.status(200).json({ permission });
}

module.exports = {
  getPermission,
}