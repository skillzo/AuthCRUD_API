import express from "express";
import {
  addUser,
  getAllUsers,
  loginUser,
} from "../controllers/user-controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", addUser);
userRouter.post("/login", loginUser);

export default userRouter;
