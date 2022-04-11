import jwt from "jsonwebtoken";

export default (req, res, next) => {
  try {
    if (!req.get("Authorization"))
      return res.status(401).json({ message: "You need to login first" });
    let user;
    try {
      user = jwt.verify(req.get("Authorization"), process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Invalid token!" });
    }

    req.userId = user.userId;
    req.username = user.username;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
  next();
};
