const User = require('../models/user.model');

const getUsers = async(req, res) => {
  const users = await User.find().sort('name');
  res.status(200).json({users, total: users.length});
}

const softDelUser = async(req, res) => {
  const { 
    params:  { id: userId}
  } = req;
  const user = await User.deleteById({ _id:userId}); 
  res.status(200).send({msg: 'user was disabled'});
}

module.exports = {
  getUsers,
  softDelUser
}
