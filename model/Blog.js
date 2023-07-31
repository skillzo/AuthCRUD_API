import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  tweet: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  reactions: {
    likes: Number,
    retweet: Number,
    Comments: Number,
  },
  user: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
    default: [],
  },
});

export default mongoose.model("blogs", blogSchema);
