import { text } from "express"
import mongoose from "mongoose"

const { Schema, model} = mongoose

const ReviewSchema = new Schema({
    comment:{type:String, required:true},
    rate:{type:Number,required:true},
    productId: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }],
},
{
    timestamps:true
})

export default model("Review",ReviewSchema)