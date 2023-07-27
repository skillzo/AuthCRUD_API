import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/userRoutes";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/user", router);

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
