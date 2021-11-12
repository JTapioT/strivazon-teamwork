import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
// import reviewRouter from "./reviews/index.js";
import { badRequest, unAuthorized, notFound, genericError } from "./errorsHandler.js";
import productsRouter from "./APIs/products/index.js";
import cartsRouter from "./services/carts/index.js";



const server = express();

// GLOBAL MIDDLEWARE
server.use(cors());
server.use(express.json());

// ROUTES

server.use("/cart", cartsRouter);
server.use('/products', productsRouter)
// server.use("/reviews", reviewRouter)


// ERROR-HANDLING MIDDLEWARE
server.use(badRequest);
server.use(unAuthorized);
server.use(notFound);
server.use(genericError);



const { PORT, MONGO_CONNECTION } = process.env;


mongoose.connect(process.env.MONGO_CONNECTION); 

mongoose.connection.on("connected", () => {
server.listen(PORT, () => {
  console.log('We are live boys 🟡 🟢')
  console.table(listEndpoints(server));
  console.log("Server is running on port:", PORT);
  });
});

mongoose.connection.on('error', (err) => console.log(err))

