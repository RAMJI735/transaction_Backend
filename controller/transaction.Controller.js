import Transaction from "../models/transaction.js";
import { wrapAsync } from "../utils/WrapAsync.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const JWT_SECRET = process.env.secret;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
}


function parseTransaction(description) {
    let amount = null;
    let category = null;

    // Extract number (amount)
    const amountMatch = description.match(/(\d+(\.\d+)?)/);
    if (amountMatch) {
        amount = parseFloat(amountMatch[0]);
    }

    // Extract category (simple keywords)
    const keywords = ["income", "expense", "food", "travel", "shopping", "rent", "salary"];
    for (let word of keywords) {
        if (description.toLowerCase().includes(word)) {
            category = word;
            break;
        }
    }

    return { amount, category };
}














export const addTransaction = wrapAsync(async (req, res, next) => {
    const { description } = req.body;
    const { amount, category } = parseTransaction(description);

    console.log(amount, category);

    const count = await Transaction.countDocuments({ email: req.user.email });
    const id = count + 1;
    const addTransaction = await Transaction.create({
        email: req.user.email,
        id: id,
        category: category,
        amount: amount,
        description: description,
    })
    res.status(200).json({
        success: true,
        message: "Transaction added successfully",
        data: addTransaction
    })
})


export const getdata = wrapAsync(async (req, res, next) => {
    const { email } = req.user;
    const transaction = await Transaction.find({ email: email });
    res.status(200).json({
        success: true,
        data: transaction
    })
})


export const updateTransaction = wrapAsync(async (req, res, next) => {
    const { description, id } = req.body;
    const { amount, category } = parseTransaction(description);

    const updateTransaction = await Transaction.updateOne({ id: id }, { amount: amount, category: category, description: description });
    res.status(200).json({
        success: true,
        message: "Transaction updated successfully",
        data: updateTransaction
    })
})


export const deleteTransaction = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const deleteTransaction = await Transaction.findById(id);
    res.status(200).json({
        success: true,
        message: "Transaction deleted successfully",
        data: deleteTransaction
    })
})



export const createToken = wrapAsync(async (req, res, next) => {
    const { email, name, sub, picture } = req.body;
    console.log(req.body);
    const payload = {
        userId: sub,
        email,
        name,
        picture
    };

    // JWT token creation (1 hour validity)
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
        success: true,
        token,
        message: "token created successfully"
    });
})