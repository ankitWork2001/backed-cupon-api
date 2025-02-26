import multer from 'multer';

import fs from "fs/promises";

import {v2 as cloudinary} from 'cloudinary';


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary=async (filePath)=>{

    try{
        const result = await cloudinary.uploader.upload(filePath, { folder: 'uploads' });
        await fs.unlink(filePath);
        return result;
    }
    catch(error)
    {
        console.log(error);
    }
}

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
});
const upload=multer({storage:storage});



export {upload,uploadToCloudinary};