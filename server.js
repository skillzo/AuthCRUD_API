import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

// app.use("/api/user", userRoutes);
app.get("/", (req, res, next) => {
  res.send("Hello world");
});

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
