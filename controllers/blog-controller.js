import Blog from "../model/Blog";

export const getAllBlogs = async (req, res) => {
  let blogs;

  try {
    blogs = await Blog.find();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  if (!blogs) {
    return res.status(404).json({ message: "no blogs found" });
  }

  return res.status(200).json({ blogs });
};

export const createBlog = async (req, res) => {
  const { tweet, user } = req.body;
  const newPost = new Blog({
    tweet,
    user,
    reactions: {
      likes: 0,
      retweet: 0,
      Comments: 0,
    },
    Comments: [],
  });

  try {
    newPost.save();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

  return res.status(200).json({ newPost });
};

export const addBlog = async (req, res) => {};
