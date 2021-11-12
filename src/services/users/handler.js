import mongoose from "mongoose";
import createHttpError from "http-errors";
import CustomerModel from "./schema.js";

const createCustomer = async (req, res, next) => {
  try {
    const customer = new CustomerModel(req.body);
    const { _id } = await customer.save();
    res.status(201).send({ _id });
  } catch (error) {
    next(error);
  }
};

const getCustomers = async (req, res, next) => {
  try {
    const customers = await CustomerModel.find();
    const count = await CustomerModel.countDocuments();
    if (customers.length) {
      res.send({ total: count, customers: customers });
    } else {
      next(createHttpError(404, "No customers to show."));
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  console.log(req.params.customerId)
  try {
    const customer = await CustomerModel.findById(req.params.customerId, {
      createdAt: 0,
      updatedAt: 0,
      __v: 0,
    });
    if(customer) {
      res.send(customer);
    } else {
      next(
        createHttpError(404, `No customer found with an id: ${req.params.customerId}`)
      )
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateCustomer = async (req,res,next) => {
  try {
    const editedCustomer = await CustomerModel.findByIdAndUpdate(
      req.params.customerId,
      req.body,
      {new: true}
    )
    if(editedCustomer) {
      res.send(editedCustomer);
    } else {
      next(createHttpError(400, `Customer not found by id: ${req.params.customerId}`))
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const deleteCustomer = async (req,res,next) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndRemove(req.params.customerId);

    if(deletedCustomer) {
      res.status(204).send();
    } else {
      next(createHttpError(400, `Author not found by id: ${req.params.customerId}`))
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

const handlers = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};

export default handlers;
