const mongoose = require('mongoose'),
      passsportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

UserSchema.plugin(passsportLocalMongoose);

module.exports = mongoose.model('User',UserSchema);