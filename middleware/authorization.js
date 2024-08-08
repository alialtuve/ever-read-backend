const Permissions = require('../models/permission.model');

const autho = (screen_code, permissionType) => async(req, res, next) => {

  const { rol } = req.user;
  
  if(!rol) {
    return res.status(401).json({msg:'Not allowed access'})
  }

  const screenAccess =  await Permissions.findOne({rol,  screen_code}).exec();

  if(!screenAccess || screenAccess == null) {
    return res.status(403).json({mdg:'No accesses provided!'})
  }

  if(!screenAccess[permissionType]) {
    return res.status(403).json({mdg:'Forbidden access!'})
  }
  
  next();
}

module.exports = { autho };
