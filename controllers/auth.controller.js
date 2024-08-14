const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const register = async(req, res) => {
  
  const {email} = req.body;

  const findEmail = await User.findOne({email});

  if(findEmail) {
    throw new BadRequestError('This email already exist!');
  }

  const user = await User.create({...req.body});

  const token = await user.generateJWT();
  
  res
  .status(StatusCodes.OK)
  .json({user:{name:user.name}, token});
}

const login = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    throw new Error('No email or password provided');
  }

  const user = await User.findOne({email});

  if(!user){
    throw new NotFoundError('User not found');
  }

  const validatePassword = await user.comparePassword(password);

  if(!validatePassword){
    throw new BadRequestError('Invalid password');
  }

  const token = await user.generateJWT();

  res.status(StatusCodes.OK).json({ user:user.name, token });
}

module.exports = {
  register,
  login
};
