import express from "express";
import {
  addUser,
  getAllUsers,
  loginUser,
} from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", addUser);
router.post("/login", loginUser);

export default router;
