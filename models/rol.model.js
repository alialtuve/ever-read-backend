const {Schema, model, Types} = require('mongoose');

const rolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 100
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: [false, 'Provide user'], //change to true
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: false, //change to true
    }
  },{timestamps:true}
);

module.exports = new model('Rol', rolSchema);
