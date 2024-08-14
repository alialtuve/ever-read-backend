const CustomAPIError = require('./custom-api');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request');
const ForbiddenError = require('./forbidden');
const UnauthorizedError = require('./unauthorized');

module.exports = {
  CustomAPIError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  UnauthorizedError
}