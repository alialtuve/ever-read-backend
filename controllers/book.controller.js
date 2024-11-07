const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Genre = require('../models/genre.model');
const { StatusCodes} = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createBook = async(req, res) => {
  const {
    user: { userId}
  } = req;
  req.body.createdBy = userId;
  const book = await Book.create( req.body);
  res.status( StatusCodes.CREATED).json({ book });
}

const getAllBooks = async(req, res) => {
  const { writer, title } = req.query;
  const queryObj = {};

  if(writer){
    queryObj.author = writer;
  }

 if(title) {
    queryObj.title = { $regex:title};
  }

  const books = await Book.find(queryObj).sort('title');
  res.status(StatusCodes.OK).json({ books, total:books.length });
}

const getBook = async(req, res) => {
  const {
    params: { id:bookId}
  } = req;
  const book = await Book.findById({ _id:bookId })
                .populate({
                  path:'author',
                  model: Author,
                  select: 'name'
                })
                .populate({
                  path:'genre',
                  model: Genre,
                  select: 'name'
                });
  if(!book){
    throw new NotFoundError(`No book with id: ${bookId}, was found`)
  }

  res.status(StatusCodes.OK).json({ book });
}

const updateBook = async(req, res) => {
  const {
    body: {title, author, stock},
    params: { id:bookId},
    user: { userId}
  } = req;

  req.body.updatedBy = userId;

  if(title =='' || author == '' || !stock){
    throw new BadRequestError('Title, Author and stock can not be empty');
  }

  const book = await Book.findByIdAndUpdate(
    { _id:bookId },
    req.body,
    { new:true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({book});
}

const softDeleteBook = async(req, res) => {
  const {
    params: { id:bookId },
    user: { userId }
  } = req;

  const book = await Book.deleteById({ _id:bookId }, userId);
  res.status(StatusCodes.OK).json({ msg:'book was disabled!' });
}

module.exports ={
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  softDeleteBook
}

