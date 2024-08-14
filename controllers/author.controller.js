const Author = require('../models/author.model');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createAuthor = async(req, res) => {
  const {
    user: { userId }
  } = req;
  req.body.createdBy = userId;
  const author = await Author.create(req.body);
  res.status(StatusCodes.OK).json({author});
}

const getAllAuthors = async(req, res) => {
  const { name, country } = req.query;
  const queryObj = {};

  if(name){
    queryObj.name = { $regex:name};
  }
  
  if(country){
    queryObj.country = { $regex:country};
  }

  const authors = await Author.find(queryObj).sort('name');
  res.status(StatusCodes.OK).json({ authors, total: authors.length });
}

const getAuthor = async(req, res) => {
  const {
    params: {id: authorId}
  } = req;
  const author = await Author.findById({_id:authorId});

  if(!author){
    throw new NotFoundError(`No author was found!`);
  }
  res.status(StatusCodes.OK).json({ author });
}

const updateAuthor = async(req, res) => {
  const {
    params: { id: authorId},
    body: {name},
    user: { userId }
  } = req;

  req.body.updatedBy = userId;

  if(!name){
    throw new BadRequestError('Author name can not be empty');
  }

  const author = await Author.findByIdAndUpdate(
    { _id:authorId },
    req.body,
    { new:true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ author });
}

const softDeleteAuthor = async(req, res) => {
  const { 
    params: { id:authorId},
    user: { userId }
  } = req;

  const author = await Author.deleteById({ _id:authorId}, userId );
  res.status(StatusCodes.OK).json({ msg:'author was disabled!'});
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
  softDeleteAuthor
}