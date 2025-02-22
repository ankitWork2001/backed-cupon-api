import mongoose,{Schema} from "mongoose";

const brandSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    logo:{
        type:String,
        
    },
    isActive:{
        type:Boolean,
        required:true,
    }}
    ,{
        timestamps:true,
    }
);

const Brand=mongoose.model("Brand",brandSchema);
export default Brand;