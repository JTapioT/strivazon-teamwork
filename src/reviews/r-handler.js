import ReviewModel from "./schema.js";
import ProductModel from "../APIs/products/schema.js";
import createHttpError from "http-errors";

const postReview = async (req, res, next) => {
  try {
    const review = await ReviewModel(req.body).save();
    console.log(review);

    if (review) {
      const newReview = { ...review.toObject() };
      console.log(newReview);
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { $push: { reviews: review._id } },
        { new: true } // opts
      );
      if (updatedProduct) {
        res.status(201).send(updatedProduct);
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.productId} not found!`
          )
        );
      }
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
};

// GET ALL REVIEWS FOR A PARTICULAR PRODUCT BY ID
const getReviewsByProductId = async (req, res, next) => {
  try {
    console.log('I AM THE THE REQ PARAMS', req.params.productId )
    const products = await ProductModel.findById(req.params.productId)
    .populate({path: "reviews", select: "comment rate"})
    console.log(products, '<<<<<<<<<<<<<<<<<<<<<<<<<< PRODUCT')

    if (products) {
      res.send(products.reviews);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// GET SPECIFIC COMMENT BY ID
const getReviewById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId)
    .populate({path: "reviews", select: "comment rate"}) //.populate({ path: "reviews", select: "comment rate"}) // This is working
    if (product) {
      const reviews = product.reviews.find(
        (r) => r._id.toString() === req.params.reviewId
      );
      if (reviews) {
        res.send(reviews);
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.productId} not found!`
          )
        );
      }
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
};

// UPDATE A REVIEW
const updateReview = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);

    if (product) {
      const updatedReview = await ReviewModel.findByIdAndUpdate(req.params.reviewId, req.body, {new:true})
      console.log(updatedReview)

        await product.save();
        res.status(203).send(updatedReview);
      } else {
        next(
          createHttpError(404, `Post with id ${req.params.productId} not found!`)
        );
      
    }
  } catch (error) {
    next(error);
  }
};

// DELETE A REVIEW
const deleteReview = async (req, res, next) => {
  try {


    const deletedReview = await ReviewModel.findByIdAndDelete(req.params.reviewId)
    console.log(deletedReview)

    if (deletedReview) {
      res.send({deletedReview});
    } else {
      next(
        createHttpError(404, `Comment with id ${req.params.productId} not found!`)
      );
    }
  } catch (error) {
    next(error);
  }
};

const reviewHandler = {
  postReview,
  getReviewsByProductId,
  getReviewById,
  updateReview,
  deleteReview
};

export default reviewHandler;
