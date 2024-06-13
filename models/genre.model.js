const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [false, 'Provide user'], //change to true
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    active: {
      type: Boolean,
      default: true
    }
  }, {timestamps:true}
);

module.exports = mongoose.model('Genre', genreSchema);
