const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    name: String,
    password:String,
});
const Login = mongoose.model("logins", loginSchema);
module.exports = Login;