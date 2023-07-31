import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { verifyJwt } from "./middleware/verifyJWT";
import blogRouter from "./routes/blog-routes";
import userRouter from "./routes/user-routes";

dotenv.config();
const app = express();

app.use(express.json());

// keep track of a global cookie in the header which can be set twith res.cookie
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use(verifyJwt);
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
