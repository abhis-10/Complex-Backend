// require('dotenv').config({path:'./env'})

import dotenv from "dotenv"

import connectDB from "./db/index.js"

dotenv.config({path:'./env'})

connectDB()






// First Approach to connect database......
/*
// import mongoose from "mongoose"
// import {DB_NAME} from  "./constants"
import express from "express"
const app = express()

(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        app.on("error",(error)=>{   // these are listeners basically they are the part of express for notifying errors in express app
            console.error("Error:",error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`Application is listening on port ${process.env.PORT}`  )
        })
    } catch (error) {
        console.log("Error Generated",error);
        throw err;
    }
})()
 */   
