import CartModel from "./schema.js";
import createHttpError from "http-errors";
import ProductModel from "../../APIs/products/schema.js";

/* async function getUserCart(req,res,next) {
  try {
    const
  } catch (error) {
    console.log(error);
    next(error);
  }
} */

async function addToCart(req, res, next) {
  try {
    const { productId, quantity } = req.body;

    const purchasedProduct = await ProductModel.findById(productId);
    if (purchasedProduct) {
      // Is product already in the active cart of the specified customerId?

      const isProductThere = await CartModel.findOne({
        customerId: req.params.customerId,
        status: "active",
        "products._id": purchasedProduct._id, // .toString() ?
      });

      if (isProductThere) {
        // Increase the quantity of the product in the cart(?)
        console.log("went here");
        const cart = await CartModel.findOneAndUpdate(
          {
            customerId: req.params.customerId,
            status: "active",
            "products._id": purchasedProduct._id,
          },
          {
            $inc: { "products.$.quantity": quantity },
          },
          {
            new: true,
          }
        );
        res.send(cart);
      } else {
        // IF NO PRODUCT - ADD NEW!
        const productToInsert = { ...purchasedProduct.toObject(), quantity };

        const cart = await CartModel.findOneAndUpdate(
          { customerId: req.params.customerId, status: "active" },
          {
            $push: { products: productToInsert },
          },
          {
            new: true,
            upsert: true,
          }
        );
        res.send(cart);
      }
    } else {
      next(createHttpError(404, `Product with id ${productId} not found!`));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function deleteFromCart(req, res, next) {
  try {
    //  const isProductThere = await CartModel.findOne({
    //       customerId: req.params.customerId,
    //       status: "active",
    //       "products._id" : purchasedProduct._id // .toString() ?
    //     })

    // GET THE CART.
    // CHECK IF QUANTITY EXISTS, QUANTITY OVER 1
    // DECREASE

    const product = await CartModel.findOneAndUpdate(
      {
        customerId: req.params.customerId,
        status: "active",
        "products._id": req.params.productId,
        quantity: { $gt: 1 },
      },
      { $inc: { "products.$.quantity": -1 } }
    );
    
    res.send(product);

  /* if (product) {
      let updatedCart = await CartModel.findOneAndUpdate(
     {
        customerId: req.params.customerId,
        status: "active",
        "products._id": req.params.productId,
        quantity: { $gt: 1 },
      },
      { $inc: { "products.$.quantity": -1 } }
      );
      res.send(updatedCart);
    } else {

    const deleted =  await CartModel.findOneAndRemove(
        {
          customerId: req.params.customerId,
          status: "active",
          "products._id": req.params.productId,
        },
        {
          $pull: { products: req.params.productId },
        }
      );
      res.status(204).send()
    }  */

  } catch (error) {
    console.log(error);
    next(error);
  }
}

const getCustomerCart = async (req, res, next) => {
  try {
    const id = req.params.customerId;
    const customerCart = await CartModel.findOne({ customerId: id });
    res.send(customerCart);
  } catch (error) {
    next(error);
  }
};
const cart = {
  addToCart,
  deleteFromCart,
  getCustomerCart,
};

export default cart;
