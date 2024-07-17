const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_LIFETIME, JWT_SECRET} = require('../config/env');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 5,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email',
      ],
      index:{unique: true}
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Please provide password'],
      minlength: 6,
      maxlength: 25,
    },
    rol: {
      type: mongoose.Types.ObjectId,
      ref: 'Rol',
      required: false
    }
  }, {timestamps:true, versionKey: false}
);

userSchema.pre('save', async function() {
  const saltCode =  await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, saltCode);
});

userSchema.methods.comparePassword = async function(typedPassword){
  const isMatch = await bcrypt.compare(typedPassword, this.password);
  return isMatch;
}

userSchema.methods.generateJWT = async function() {
  const token = await jwt.sign({user:this.id, name:this.name, rol:this.rol}, JWT_SECRET, {
    expiresIn: JWT_LIFETIME
  });

  return token;
}

userSchema.plugin(mongoose_delete, { deletedAt : true, overrideMethods: true });

module.exports = mongoose.model('User', userSchema);
