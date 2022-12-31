"use strict";
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    name: String, // First name of the user.
    image: String,  // Last name of the user.
    author: String,   
    genre: String ,
    description: String,  // A brief user description
});
var User = mongoose.model('Users', userSchema);
module.exports = User;
