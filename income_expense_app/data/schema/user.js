'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    profile: {type:String, default: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="},
    email:{type: String, unique: true},
    password: String,
    username: String,

});
const User = mongoose.model("users", userSchema);
module.exports = User;