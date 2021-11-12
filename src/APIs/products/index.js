import express from 'express'
import productsHandler from './p-handler.js'
import reviewHandler from '../../reviews/r-handler.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

const productsRouter = express.Router()

// IMAGE CLOUD STORAGE
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary, // CREDENTIALS,
    params: {
      folder: "strivazon",
    },
  });

productsRouter.get("/", productsHandler.getAll)

productsRouter.post("/", productsHandler.createProduct)

productsRouter.put("/:id", multer({ storage: cloudinaryStorage}).single('image'), productsHandler.uploadImage)

productsRouter.route("/:id") 
.get(productsHandler.getById)
.put(productsHandler.updateProduct)
.delete(productsHandler.deleteProduct)

//***************************************** REVIEW ROUTE ***************************************/
productsRouter.post("/:productId/reviews", reviewHandler.postReview)
productsRouter.get("/:productId/reviews", reviewHandler.getReviewsByProductId)
productsRouter.route("/:productId/reviews/:reviewId")
.get(reviewHandler.getCommentById)

export default productsRouter