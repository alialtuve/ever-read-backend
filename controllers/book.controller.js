const Book = require('../models/book.model');

const createBook = async(req, res) => {
  const book = await Book.create( req.body);
  res.status(201).json({ book });
}

const getAllBooks = async(req, res) => {
  const books = await Book.find().sort('title');
  res.status(200).json({ books, total:books.length });
}

const getBook = async(req, res) => {
  const {
    params: { id:bookId}
  } = req;
  const book = await Book.findById({ _id:bookId });
  res.status(200).json({ book })
}

const updateBook = async(req, res) => {
  const {
    params: { id:bookId}
  } = req;
  const book = await Book.findByIdAndUpdate(
    { _id:bookId },
    req.body,
    { new:true }
  );
  res.status(200).json({ book });
}

const softDelteBook = async(req, res) => {
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
  softDelteBook
}

