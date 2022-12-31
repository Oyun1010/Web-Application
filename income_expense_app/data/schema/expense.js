const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    amount: Number,
    date_time: {type: Date, default: Date.now},
    user_id: mongoose.Schema.Types.ObjectId,
    type:String
});
const Expense = mongoose.model("expenses", expenseSchema);
module.exports = Expense;