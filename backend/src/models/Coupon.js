import mongoose,{Schema} from "mongoose";

const couponSchema=new Schema({
    couponCode:{
        type:String,
        required:true,
        unique:true,
    },
    brand:{
        type:Schema.Types.ObjectId,
        ref:"Brand",
        required:true,
    },
    discountPercentage:{
        type:Number,
        required:true,
    },
    expiryDate:{
        type:Date,
        required:true,
    },
    terms:{
        type:String,
        required:true,
    },
    isActive:{
        type:Boolean,
        required:true,
    }}
    ,
    {
        timestamps:true,
    }
);

const Coupon=mongoose.model("Coupon",couponSchema);
export default Coupon;
