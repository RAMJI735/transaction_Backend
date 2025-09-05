import { Router } from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
import { verifyToken } from "../utils/verifyToken.js";

import { addTransaction, createToken, deleteTransaction, getdata, updateTransaction } from "../controller/transaction.Controller.js";

// Configure dotenv
dotenv.config();

const router = Router();


router.post("/auth/google", createToken);


router.get("/getTransaction",verifyToken, getdata)
router.post("/addTransaction",verifyToken, addTransaction)
router.put("/updateTransaction",verifyToken, updateTransaction)
router.delete("/:id",verifyToken,deleteTransaction);



export default router;