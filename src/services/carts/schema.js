import mongoose from "mongoose";
const {Schema, model} = mongoose;

const cartSchema = new mongoose.Schema({
customerId: {type: Schema.Types.ObjectId, ref: "Customer", required: true},
status: { type: String, required: true, enum: ["active", "paid"] },
products: [{ 
  productId: {type: Schema.Types.ObjectId},
  name: {type: String}, 
  brand: {type: String}, 
  category: {type: String}, 
  price: {type: Number}, 
  quantity: {type: Number}
}]
},
{timestamps: true}
)

export default model("Cart", cartSchema);