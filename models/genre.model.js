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
      required: [true, 'Provide user'],
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: false,
    }
  }, {timestamps:true, versionKey:false}
);

genreSchema.plugin(mongoose_delete, { deletedAt :true, deletedBy:true, overrideMethods: true });

module.exports = mongoose.model('Genre', genreSchema);
