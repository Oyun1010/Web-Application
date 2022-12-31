'use strict';
const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
    amount: Number,
    date_time: {type: Date, default: Date.now},
    user_id: mongoose.Schema.Types.ObjectId,
    type:String
});
const Income = mongoose.model("incomes", incomeSchema);
module.exports = Income;