import Post from "../models/post.model.js";

export default async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const inDbPost = await Post.findOne({ id: postId, deleted: false });

    if (!inDbPost) return res.status(404).json({ message: "Post not found" });

    if (inDbPost.author != req.userId)
      return res.status(401).json({ mesage: "You are not the post author" });

    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
