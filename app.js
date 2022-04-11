import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import cors from "cors";

var corsOptions = {
  origin: "*",
  methods: "GET, POST, DELETE, PUT",
};
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(authRoutes);
app.use(postRoutes);
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3001);
  })
  .catch((err) => console.log(err));
