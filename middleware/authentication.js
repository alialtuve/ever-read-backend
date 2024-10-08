const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/env');

const authenticate =  async (req, res, next) => {

  const authHeader = req.headers.authorization;
  
  if(!authHeader || !authHeader.startsWith('Bearer')){
    throw new Error ('Invalid authentication');
  }
  
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {userId: payload.user, name:payload.name, rol:payload.rol};
    next();

  } catch(error){
    return res.status(401).json({msg: 'Unauthenticated, invalid token'});
  }
}

module.exports = authenticate ;
