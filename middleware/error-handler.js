const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  
  let customError = {
    statusCode: err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  }

  if(err.name ==='ValidatonError'){
    customError.msg = Object.values(err.errors).map((item)=>item.message).join(',');
    customError.statusCode = 400
  }

  if(err.code && err.code ===11000){
    customError.msg =`Duplicate value entered for ${Object.keys(err.keyValue)} field, plesase choose another value`;
    customError.statusCode = 400
  }

  if(err.name === 'CastError'){
    customError = `No item found with id: ${Object.values(err.value)}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json({msg: customError.msg});
}

module.exports = errorHandlerMiddleware;
