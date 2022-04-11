import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
    likes: {
      count: { type: Number, default: 0 },
      likers: { type: [Schema.Types.ObjectId] },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Posts", postSchema);
