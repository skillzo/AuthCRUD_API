import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import blogRouter from "./routes/blog-routes";
import userRouter from "./routes/user-routes";

console.log(uuidv4());

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

mongoose
  .connect(process.env.mongoDB_URI)
  .then(() => {
    app.listen(8080, () => {
      console.log("app started on port 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
