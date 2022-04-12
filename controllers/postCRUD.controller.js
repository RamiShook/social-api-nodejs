import Post from "../models/post.model.js";
import mongoose from "mongoose";

export async function createPost(req, res) {
  try {
    const { title, body } = req.body;
    const { userId } = req;
    const author = { title, body, author: userId };
    const result = await Post.create(author);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function findAll(req, res) {
  try {
    const posts = await Post.find({ deleted: false }, { __v: 0 }).populate(
      "author",
      "-isAdmin -createdAt -updatedAt -__v"
    );

    if (!posts) return res.status(200).json({ message: "No Posts Yet..!" });

    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteById(req, res) {
  try {
    const postId = req.params.postId;

    await Post.findByIdAndUpdate(postId, { deleted: true });

    return res.status(200).json({ message: `Post ${postId} Deleted!` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error });
  }
}
