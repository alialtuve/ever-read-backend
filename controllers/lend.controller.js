const Lend = require('../models/lend.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

const createLend = async(req, res) => {
  const lend = await Lend.create(req.body);
  res.status(201).json({ lend });
}

const getAllLend = async(req, res) => {
  const lend = await Lend.find()
                .populate({ path:'book', model:Book, select:'title' })
                .populate({ 
                  path:'user', 
                  model:User, 
                  select: {'name':1, 'email':1 } 
                })
                .sort('createdBy');

  res.status(200).json({ lend, total: lend.length });
}

const getLend = async(req, res) => {
  const {
    params: {id:lendId}
  } = req;
  const lend = await Lend.findById({_id:lendId})
                .populate({ path: 'book', model: Book })
                .populate({ path: 'user', model: User });

  res.status(200).json({ lend });
}

module.exports = {
  createLend,
  getAllLend,
  getLend,
}