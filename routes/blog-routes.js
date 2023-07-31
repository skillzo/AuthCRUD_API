import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/create", createBlog);

export default blogRouter;
