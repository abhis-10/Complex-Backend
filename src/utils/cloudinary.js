
import {v2 as cloudinary} from "cloudinary";
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINAR_API_KEY, 
    api_secret: process.env.CLOUDINAR_API_SECRET 
});

const uploadOnCloudinary = async (localfilePath)=>{
    try {
        if (!localfilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type: "auto",
        })
        // file has been uploaded successfully
        console.log(response.url)
        return response;
    } catch (error) {
        fs.unlinkSync(localfilePath) // remove the locally saved temporary file as the uploaded operation got failed
        return null;
    }
}

export {uploadOnCloudinary}