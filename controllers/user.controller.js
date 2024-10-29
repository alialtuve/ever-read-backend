const User = require('../models/user.model');
const Rol = require('../models/rol.model');
const { StatusCodes } = require('http-status-codes');
const { UnauthorizedError } = require('../errors');

const getUsers = async(req, res) => {

  const users = await User.find()
                    .sort('name').populate({
                      path:'rol', 
                      model:Rol, 
                      select:'name',
                     });

  res.status(StatusCodes.CREATED).json({users, total: users.length});
}

const softDelUser = async(req, res) => {
  const { 
    params:  { id: userId}
  } = req;
  const user = await User.deleteById({ _id:userId}); 
  res.status(StatusCodes.OK).send({msg: 'user was disabled'});
}

const updateUserPass = async(req, res) => {

  const {userId,  /*password*/ newPassword} = req.body; 
 
  //const validatePassword = await user.comparePassword(password);

  //if(!validatePassword){
    //throw new UnauthorizedError('Invalid password');
  //}
  
  //await User.updateOne({password: newPassword}).exec();

  const user = await Book.findByIdAndUpdate(
    { _id:userId },
    { password: newPassword},
    { new:true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ user });

}

module.exports = {
  getUsers,
  softDelUser,
  updateUserPass
}
