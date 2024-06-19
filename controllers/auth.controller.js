const User = require('../models/user.model');

const register = async(req, res) => {
  const user = await User.create({...req.body});
  res
  .status(201)
  .json({user:{name:user.name, role:user.role}});
}

module.exports = register;
