import express from "express"
import handler from "./handler.js"
const router = express.Router();

router.route("/").post(handler.createCustomer).get(handler.getCustomers)

router.route("/:customerId").get(handler.getCustomerById).put(handler.updateCustomer).delete(handler.deleteCustomer)

export default router 