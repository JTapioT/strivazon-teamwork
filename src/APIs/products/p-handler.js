import ProductModel from "./schema.js";
import ReviewModel from "../../reviews/schema.js"
import q2m from "query-to-mongo";

// CREATE NEW PRODUCT
const createProduct = async (req, res, next) => {
  try {
    const product = new ProductModel(req.body);
    const { _id } = await product.save();
    res.status(201).send({ _id });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// UPLOAD IMAGEURL FROM CLOUD
const uploadImage = async (req, res, next) => {
  try {
      const imagePath = req.file.path 
      const id = req.params.id

      const product = await ProductModel.findByIdAndUpdate(
          id,
          {$set: { imageUrl: imagePath }})
          res.status(203).send(product)
  } catch (error) {
      console.log(error)
      next(error)
  }
};

// GET ALL THE PRODUCTS
const getAll = async (req, res, next) => {
  try {
    const mongoQuery = q2m(req.query);
    console.log(mongoQuery);

    const total = await ProductModel.countDocuments(mongoQuery.criteria);
    const post = await ProductModel.find(mongoQuery.criteria)
      .limit(mongoQuery.options.limit)
      .skip(mongoQuery.options.skip)
      .sort(mongoQuery.options.sort)
      .populate({ path: "reviews", select: "comment rate"}) // This is working

    res.send({
      links: mongoQuery.links("/products", total),
      pageTotal: Math.ceil(total / mongoQuery.options.limit),
      total,
      post,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};



const getById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const product = await ProductModel.findById(id);
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(203).send(updatedProduct);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteProduct = await ProductModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.log(error);
    next(error);
  }
};




const productsHandler = {
  createProduct,
  getAll,
  uploadImage,
  getById,
  updateProduct,
  deleteProduct,
}

export default productsHandler;
