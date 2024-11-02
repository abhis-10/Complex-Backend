import mongoose,{Schema} from "mongoose";
import { jwt } from "jsonwebtoken";
import bcrypt from "bcrypt"
 
const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        indexd:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true 
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        index:true
    },
    avatar:{
        type:String,  // cloudinary url
        required:true,
    },
    coverImage:{
        type:String // cloudinary url 
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,'Password is required']
    },
    refreshToken:{
        type:String
    }

},{timestamps:'true'})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return  await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
            fullname:this.fullname,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRE
        }
    )
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this.id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRE
        }
    )
}
export const User = mongoose.model('User',userSchema)