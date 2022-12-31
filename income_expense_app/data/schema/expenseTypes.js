const mongoose = require('mongoose');

const eTypesScheme = new mongoose.Schema({
    types:Array
});
const Etypes = mongoose.model('expense_types', eTypesScheme);
module.exports = Etypes;