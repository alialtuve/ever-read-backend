const Book = require('../models/book.model');
const Lend = require('../models/lend.model');

const checkAvalability = async(bookId) => {

    const res = await Book.findById(bookId);

    if(res.borrowed === res.stock){
      return -1;
    }

    if(res.borrowed === 0){
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
