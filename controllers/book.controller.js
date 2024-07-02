const Book = require('../models/book.model');
const Author = require('../models/author.model');
const Genre = require('../models/genre.model');

const createBook = async(req, res) => {
  const book = await Book.create( req.body);
  res.status(201).json({ book });
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
  res.status(200).json({ books, total:books.length });
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
  res.status(200).json({ book })
}

const updateBook = async(req, res) => {
  const {
    params: { id:bookId}
  } = req;
  const book = await Book.findByIdAndUpdate(
    { _id:bookId },
    req.body,
    { new:true, runValidators: true }
  );
  res.status(200).json({ book });
}

const softDeleteBook = async(req, res) => {
  const {
    params: { id:bookId }
  } = req;
  const book = await Book.deleteById({ _id:bookId });
  res.status(200).json({ msg:'book was disabled!' });
}

module.exports ={
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  softDeleteBook
}

