const Book = require('../models/book.model');
const Lend = require('../models/lend.model');

const checkAvalability = async(bookId) => {

    const res = await Book.findById(bookId);

    if(res.available === res.stock){
      return -1;
    }

    if(res.available === res.stock){
      return 0;
    }

    return res;
}

const checkIsLended = async(bookId, userId) => {
  const res = await Lend.countDocuments({
    user: userId,
    book: bookId,
    returned: false
  });
  return res;
}

module.exports = {checkAvalability, checkIsLended };
