import Post from "../models/post.model.js";
export async function createPost(req, res) {
  try {
    console.log("Hello from the controller " + req);
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
