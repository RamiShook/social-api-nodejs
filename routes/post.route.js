import express from "express";
import createPostRequest from "../middlewares/post/createPostRequest.middleware.js";
import * as postController from "../controllers/post.controller.js";
import isLoggedIn from "../middlewares/isLoggedIn.middleware.js";
const router = express.Router();

router.post("/post", isLoggedIn, createPostRequest, postController.createPost);

export default router;
