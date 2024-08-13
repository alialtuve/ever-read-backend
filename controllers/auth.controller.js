const User = require('../models/user.model');

const register = async(req, res) => {
  
  const {email} = req.body;

  const findEmail = await User.findOne({email});

  if(findEmail) {
    res.status(400).json({msg:'This email already exist!'}); /* This must change after implementing handle errors middleware**/
  }

  const user = await User.create({...req.body});

  const token = await user.generateJWT();
  
  res
  .status(201)
  .json({user:{name:user.name}, token});
}

const login = async(req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    throw new Error('No email or password provided');  /* This must change after implementing handle errors middleware**/
  }

  const user = await User.findOne({email});

  if(!user){
    throw new Error('User not found'); /* This must change after implementing handle errors middleware**/
  }

  const validatePassword = await user.comparePassword(password);

  if(!validatePassword){
    throw new Error('Invalid password'); /* This must change after implementing handle errors middleware**/
  }

  const token = await user.generateJWT();

  res.status(200).json({ user:user.name, token });
}

module.exports = {
  register,
  login
};
