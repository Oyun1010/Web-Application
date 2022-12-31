const mongoose = require('mongoose');

const iTypesScheme = new mongoose.Schema({
    types:Array
});
const Itypes = mongoose.model('income_types', iTypesScheme);
module.exports = Itypes;