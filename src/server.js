import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import reviewRouter from "./reviews";

const server = express();

// GLOBAL MIDDLEWARE
server.use(cors());
server.use(express.json());

// ROUTES

server.use("/reviews",reviewRouter)


// ERROR-HANDLING MIDDLEWARE



const { PORT } = process.env;


mongoose.connect(process.env.MONGODB_URI); // NEED ONE MONGO DB CONNECTION FROM SOMEONE.
mongoose.connection.on(connected, () => {
server.listen(PORT, () => {
    console.table(listEndpoints(server));
    console.log("Server is running on port:", PORT);
  });
});