import ReviewModel from "./schema.js";
import ProductModel from "../APIs/products/schema.js";

const postReview = async (req, res, next) => {
  try {
    const review = await ReviewModel(req.body);
    console.log(review);

    if (review) {
      const newReview = { ...review.toObject() };
      console.log(newReview);
      const updatedProduct = await ProductModel.findByIdAndUpdate(
        req.params.productId,
        { $push: { reviews: newReview } },
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
    const products = await ProductModel.findById(req.params.productId)
    // .populate({path: "reviews", select: "comment "})

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
const getCommentById = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productId);
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

const reviewHandler = {
  postReview,
  getReviewsByProductId,
  getCommentById
};

export default reviewHandler;
