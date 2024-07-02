const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

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
    }
  }, {timestamps:true}
);

genreSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = mongoose.model('Genre', genreSchema);
