import mongoose,{Schema} from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        required:true,
    }}
    ,{
        timestamps:true,
    }
);

const Category=mongoose.model("Category",categorySchema);
export default Category;