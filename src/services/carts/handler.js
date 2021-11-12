import CartModel from "./schema.js";
import createHttpError from "http-errors";
import ProductModel from "../product/schema.js"


async function addToCart(req,res,next) {
  try {
    const {productId, quantity} = req.body;

    const purchasedProduct = await ProductModel.findById(productId);
  if(purchasedProduct){
    // Is product already in the active cart of the specified customerId?

    const isProductThere = await CartModel.findOne({
      customerId: req.params.customerId,
      status: "active",
      "products.productId" : purchasedProduct._id // .toString() ?
    })

    if(isProductThere) {
      // Increase the quantity of the product in the cart(?)
      
      const cart = await CartModel.findOneAndUpdate({
        customerId: req.params.customerId,
        status: "active",
        "products.productId": purchasedProduct._id
      },
      {
        $inc: {"products.$.quantity": quantity},
      },
      {
        new:true
      }
      )
      res.send(cart);
    } else {
      // IF NO PRODUCT - ADD NEW!
      const productToInsert = {...purchasedProduct.toObject(), quantity }

      const cart = await CartModel.findOneAndUpdate(
        {customerId: req.params.customerId, status: "active"},
        {
          $push: { products: productToInsert },
        },
        {
          new :true,
          upsert: true,
        }
        )
        res.send(cart);
    }
  }else{
    next(createHttpError(404, `Product with id ${productId} not found!`))
  }
  } catch (error) {
    console.log(error);
    next(error);
  }
};


async function deleteFromCart(req,res,next) {
  try {
    /**
     * TODO: Find the Cart of the customer, with their ID
     * TODO: Find the product by its iD
     */
    
    const updatedCart = CartModel.findOneAndRemove(
      {
        customerId: req.params.customerId,
        status: "active",
        "products.productId": req.params.productId
      },
      {
        $pull: {products: req.params.productId }
      }
    )

    res.status(204).send();


  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const cart  = {
  addToCart,
  deleteFromCart
}
