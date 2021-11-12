import mongoose from 'mongoose'

const  { Schema, model } = mongoose

const ProductSchema = new Schema(
    {
        name: {type: String, required: true},  //REQUIRED
        description: {type: String, required: true}, //REQUIRED
        brand: {type: String, required: true}, //REQUIRED
        imageUrl: {type: String, required: true}, //REQUIRED
        price: {type: Number, required: true}, //REQUIRED
        category: {type: String, required: true}, //REQUIRED
        reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}]
    },
    {
        timestamps: true
    }
)

export default model('Product', ProductSchema)