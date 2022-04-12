import Post from "../models/post.model.js";
import mongoose from "mongoose";

export async function likePost(req, res) {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId))
      return res.status(422).json({ message: "Post id is not valid!" });

    const post = await Post.findById(postId);

    if (!post) return res.status(422).json({ message: "Post not found!" });
    let message;
    if (post.author.toString() === mongoose.Types.ObjectId(userId).toString())
      message = "Like your own post?, Why Not! :p";

    if (post.likes.likers.indexOf(userId) != -1)
      return res.status(422).json({
        message: `You already liked this post! Hit ./post/${postId}/unlike to unlike post`,
      });

    post.likes.count += 1;
    post.likes.likers.push(userId);

    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      returnOriginal: false,
    });
    return res.status(200).json({ updatedPost, message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

export async function unlikePost(req, res) {
  try {
    const userId = req.userId;
    const postId = req.params.postId;

    const post = validatePost(postId);

    let message;
    if (post.author.toString() === mongoose.Types.ObjectId(userId).toString())
      message = "Like your own post?, Why Not! :p";

    if (post.likes.likers.indexOf(userId) != -1)
      return res.status(422).json({
        message: `You already liked this post! Hit ./post/${postId}/unlike to unlike post`,
      });

    post.likes.count += 1;
    post.likes.likers.push(userId);

    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      returnOriginal: false,
    });
    return res.status(200).json({ updatedPost, message });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}

const validatePost = async (postId) => {
  if (!mongoose.Types.ObjectId.isValid(postId))
    return res.status(422).json({ message: "Post id is not valid!" });

  const post = await Post.findById(postId);

  if (!post) return res.status(422).json({ message: "Post not found!" });

  return post;
};
