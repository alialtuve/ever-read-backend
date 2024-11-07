const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {

  const errValue = err.errors? Object.values(err.errors)[0] : false;

  const strErrValue = JSON.stringify(errValue);
  const objErrValue = JSON.parse(strErrValue);
    
  let customError = {
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }

  if(objErrValue.name === 'ValidatorError'){
    customError.msg = objErrValue.message;
    customError.statusCode = 400
  }

  return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware;
