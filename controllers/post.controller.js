import Post from "../models/post.model.js";
export async function createPost(req, res) {
  try {
    const { title, body } = req.body;
    const { userId } = req;
    const author = { title, body, author: { id: userId } };
    console.log(author);
    const result = await Post.create(author);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

export async function findAll(req, res) {
  const posts = await Post.find().populate({
    path: "author.id",
    model: "User",
  });
  if (!posts) return res.status(200).json({ message: "No Posts Yet..!" });
  console.log(posts);
  return res.status(200).send(posts);
}
