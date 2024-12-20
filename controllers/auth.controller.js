const User = require('../models/user.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthorizedError } = require('../errors');

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
  .json({ msg: 'user created'});
}

const login = async(req, res) => {

  const {email, password} = req.body;
  if(!email || !password){
    throw new BadRequestError('No email or password provided');
  }

  const user = await User.findOne({email});

  const areValidCredentials = user && (await user.comparePassword(password));
  if(!areValidCredentials){
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = await user.generateJWT();
  const cookieDuration = 1000*60*60*8;
  res.cookie('token', token, {
    httpOnly:true,
    expires:new Date(Date.now() + cookieDuration),
    secure:process.env.NODE_ENV === 'PRODUCTION'
  });

  res.status(StatusCodes.OK).json({ msg: 'User logged in' });
}

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly:true,
    expires: new Date(Date.now()),
  });
  
  res.status(StatusCodes.OK).json({ msg: 'user logged out'})
}

module.exports = {
  register,
  login,
  logout
};
