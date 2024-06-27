const mongoose = require('mongoose');

const lendSchema = new mongoose.Schema({
    book:{
      type: mongoose.Types.ObjectId,
      ref: 'Book',
      required: true
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    returned: { // returned true - no returned : false
      type: Boolean,
      default: false
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [false, 'Provide user'], // change to true
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    }
  }, {timestamps: true}
);

module.exports = mongoose.model('Lend', lendSchema);
