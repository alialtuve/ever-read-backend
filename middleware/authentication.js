const {UnauthorizedError} = require('../errors');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/env');

const authenticate =  async (req, res, next) => {
  
  const token = req.headers?.cookie?.split('token=')[1] || false;
  
  if(!token && !req.headers.cookie){
    throw new UnauthorizedError ('Invalid authentication');
  }  
 
  try {
    const payload = jwt.verify(token, JWT_SECRET);    
    req.user = {userId: payload.user, name:payload.name, rol:payload.rol};
    next();

  } catch(error){
    return res.status(401).json({msg: 'Unauthenticated, invalid token'});
  }
}

module.exports = authenticate;
