import mongoose,{Schema} from "mongoose";

const productSchema=new Schema ({
    name:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    image:{
        type:String
    },
    price:{
        type:Number,
        required:true,
    },
    discount:{
        type:Number,
        required:true,
    },
    finalPrice:{
        type:Number,
        required:true,
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required:true
    },
    affiliateLink:{
        type:String,
        required:true
    },
    dealExpiry:{
        type:Date,
        required:true
    },
   
},
{
    timestamps:true,
}
);

const Product=mongoose.model("Product",productSchema);
export default Product;