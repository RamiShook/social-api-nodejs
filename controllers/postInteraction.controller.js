import mongoose from 'mongoose';
import Post from '../models/post.model.js';

const validatePost = async (postId, res) => {
  const post = await Post.findById(postId);

  if (!post) return res.status(422).json({ message: 'Post not found!' });

  return post;
};

export async function likePost(req, res) {
  try {
    const { userId } = req;
    const { postId } = req.params;

    const post = await validatePost(postId, res);

    let message;
    if (post.author.toString() === mongoose.Types.ObjectId(userId).toString()) {
      message = 'Like your own post?, Why Not! :p';
    }

    if (post.likes.likers.indexOf(userId) !== -1) {
      return res.status(422).json({
        message: `You already liked this post! Hit ./post/${postId}/unlike to unlike post`,
      });
    }

    post.likes.count += 1;
    post.likes.likers.push(userId);

    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      returnOriginal: false,
    });
    return res.status(200).json({ updatedPost, message });
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
}

export async function unlikePost(req, res) {
  try {
    const { userId } = req;
    const { postId } = req.params;

    const post = await validatePost(postId, res);

    if (post.likes.likers.indexOf(userId) === -1) {
      return res.status(422).json({
        message: `You never liked this post! Hit ./post/${postId}/like to like the post`,
      });
    }

    post.likes.count -= 1;
    post.likes.likers = post.likes.likers.filter(
      (e) => e.toString() !== userId.toString(),
    );
    const updatedPost = await Post.findByIdAndUpdate(postId, post, {
      returnOriginal: false,
    });
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
}
