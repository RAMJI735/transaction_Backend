const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        description: "ID of the transaction"
    },
    category: {
        type: String,
        required: true,
        description: "Category of the transaction"
    },
    amount: {
        type: Number,
        required: true,
        description: "Amount of the transaction"
    },
    email: {
        type: String,
        required: true,
        description: "Email of the user who made the transaction"
    },
    description:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
