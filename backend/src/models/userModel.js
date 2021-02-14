const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  bio: { type: String },
  image: { type: String },
  twitter: { type: String },
  instagram: { type: String }
});

const UserModel = mongoose.model('User', userSchema);

module.exports =  UserModel;