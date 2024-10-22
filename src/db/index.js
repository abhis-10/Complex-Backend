import mongoose, { mongo } from "mongoose";
import {DB_NAME} from "../constants.js"

                // Second Approach to Connect to Database..
const connectDB = async() =>{
    try {
      const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/$(DB_NAME)`)  // mongoose ek return object deta hai isiliye hum isko ek variable mai bhi rakh skte hai
      console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGOBD connection FAILED",error)
        process.exit(1)
    }
}

export default connectDB