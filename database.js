import mongoose from "mongoose";

 export const ConnectMongoDb= async(dburl)=>{
    try {
        await mongoose.connect(dburl);
        console.log("Database Connected")
        
    } catch (error) {
        console.log(error)
    }
}

