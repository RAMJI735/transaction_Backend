import express from "express";
import dotenv from "dotenv"
import { ConnectMongoDb } from "./database.js";
import cors from "cors";
dotenv.config();

import googleRoute from './routes/googleAuth.js'

const app = express();
ConnectMongoDb(process.env.dburl);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors());
app.use("/",googleRoute);





app.use((err,req,res, next)=>{
 
    let {status=500,message="Something went Wrong"}= err;
   return res.status(status).json({sucess:false,message});
    // res.send("something wents wrong");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
    console.error('Error starting server:', err);
});