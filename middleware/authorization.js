const Permissions = require('../models/permission.model');
const {ForbiddenError, UnauthorizedError} = require('../errors');

const autho = (screen_code, permissionType) => async(req, res, next) => {

  const { rol } = req.user;
  
  if(!rol) {
    throw new UnauthorizedError('Not authorized!');
  }

  const screenAccess =  await Permissions.findOne({rol,  screen_code}).exec();

  if(!screenAccess || screenAccess == null) {
    throw new ForbiddenError('Not allowed access!');
  }

  if(!screenAccess[permissionType]) {
    throw new ForbiddenError('Not allowed access!');
  }

  next();
}

module.exports = { autho };
