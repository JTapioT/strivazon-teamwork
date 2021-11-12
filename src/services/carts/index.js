import express from "express";
import CartModel from "./schema.js";
import createHttpError from "http-errors";
import cart from "./handler.js";

const cartsRouter = express.Router();




cartsRouter.get("/:customerId", cart.getCustomerCart);

cartsRouter.post("/:customerId/addToCart", cart.addToCart);
// cartsRouter.get() ??
cartsRouter.delete("/:customerId/remove/:productId", cart.deleteFromCart);


export default cartsRouter;