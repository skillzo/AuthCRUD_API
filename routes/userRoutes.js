import express from "express";
import { addUser, getAllUsers } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", addUser);

export default router;
