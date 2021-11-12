// import express from "express"
// import ReviewModel from "./schema.js"
// import ProductModel from "../APIs/products/schema.js"
// import createHttpError from "http-errors"

// const reviewRouter = express.Router()

// // to post the review
// reviewRouter.post("/",async(req,res,next)=>{
//     try {

//         const review = await ReviewModel(req.body)
//         const {_id} = await review.save()
//         res.status(201).send({_id})

//     } catch (error) {
//         next(error)
//     }
// })
//  // get all the reviews
//  reviewRouter.get("/",async(req,res,next)=>{
//     try {
//         const reviews = await ReviewModel.find()

//         res.status(200).send(reviews )

//     } catch (error) {
//         next(error)
//     }
// })

// // get the reviews by reviewId
// reviewRouter.get("/:reviewId",async(req,res,next)=>{
//     try {
//         const id = req.params.reviewId
//         const review = await ReviewModel.findById(id)
//         res.status(200).send(review )

//     } catch (error) {
//         next(error)
//     }
// })

// // update the reviews by reviewId
// reviewRouter.put("/:reviewId",async(req,res,next)=>{
//     try {
//         const id = req.params.reviewId
//         const updateReview = await ReviewModel.findByIdAndUpdate(id, req.body,{new:true})
//         if(updateReview){
//             res.send(updateReview)
//         }else{

//             next(createHttpError(`review with id ${req.params.reviewId} not found !`))
//         }

//     } catch (error) {
//         next(error)
//     }
// })
//  // delete the reviews by reviewId
//  reviewRouter.delete("/:reviewId",async(req,res,next)=>{
//     try {
//         const id = req.params.reviewId
//         const deleteReview = await ReviewModel.findByIdAndDelete(id)
//         if(deleteReview){
//             res.send("ok")
//         } else{
//             next(createHttpError(`review with id ${req.params.reviewId} not found !`))
//         }

//     } catch (error) {
//         next(error)
//     }
// })

// export default reviewRouter
