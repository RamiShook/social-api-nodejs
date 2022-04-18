import mongoose from 'mongoose';

export default (req, res, next) => {
  const { postId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(422).json({ message: 'Post id is not valid!' });
  }

  return next();
};
