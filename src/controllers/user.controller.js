import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    // get user details from frontend
    //validation - not empty    
    //check if user already exist by username , email
    // check for images, check for avatar
    // upload them on cloudinary
    // create an user object - create entry in db
    //remove password and refreshToken field from response
    // check for user creation
    // return res


    const {fullName , email , username , password} = req.body
    console.log(fullName)

    if(
        [fullName,email,username,password].some((field)=>
            field?.trim()=="")
    ){
        throw new ApiError(400,"All fields required")
    }

   const existedUser =  User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists!")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    // What is Optional Chaining ?.
    //Optional chaining (?.) is a feature in JavaScript that makes it easier to access properties of an object without worrying about whether parts of the object exist. It helps prevent errors when trying to access a property of something that is undefined or null.

    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400 , "Avatar file is required")
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath)
   const coverImage = await uploadOnCloudinary(coverImageLocalPath)

   if(!avatar){
    throw new ApiError(400 , "Avatar file is required")
   }

   const user = await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   ) // It fetches a specific user's data from the database but excludes sensitive fields like password and refreshToken from the response.

   if(!createdUser){
    throw new ApiError(500, "Failed to fetch user details")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registered Successfully!")
   )
})

export {registerUser}