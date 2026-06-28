const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Post = require("./models/Post");
const Comment = require("./models/Comment");
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/socialmedia")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// USER MODEL
const User = require("./models/User");

// REGISTER ROUTE (IMPORTANT)
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User already exists");
    }

    const user = new User({ username, email, password });
    await user.save();

    res.send("User registered successfully");

  } catch (err) {
    res.send("Error occurred");
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.send("User not found");
    }

    // check password
    if (user.password !== password) {
      return res.send("Incorrect password");
    }

    res.send("Login successful");

  } catch (err) {
    res.send("Error during login");
  }
});
app.post("/post", async (req, res) => {
  try {
    console.log("POST ROUTE HIT");
    console.log(req.body);

    const { userId, content } = req.body;

    const post = new Post({
      userId,
      content
    });

    await post.save();

    res.send("Post created successfully");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
app.post("/test", (req, res) => {
  console.log("TEST HIT");
  console.log(req.body);
  res.send("Test working");
});
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("userId");
    res.send(posts);
  } catch (err) {
    res.send(err.message);
  }
});
app.post("/like/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.send("Post not found");
    }

    if (!post.likes.includes(req.body.userId)) {
      post.likes.push(req.body.userId);
      await post.save();
      return res.send("Post liked");
    }

    res.send("Already liked");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
app.post("/follow/:id", async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const targetUser = await User.findById(req.params.id);

    if (!user || !targetUser) {
      return res.send("User not found");
    }

    if (!user.following.includes(targetUser._id)) {
      user.following.push(targetUser._id);
      targetUser.followers.push(user._id);

      await user.save();
      await targetUser.save();

      return res.send("Followed successfully");
    }

    res.send("Already following");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
app.post("/comment", async (req, res) => {
  try {
    const { postId, userId, text } = req.body;

    const comment = new Comment({
      postId,
      userId,
      text
    });

    await comment.save();

    res.send("Comment added successfully");
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.send("User not found");
    }

    res.send(user);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
app.get("/comments/:postId", async (req, res) => {
  try {
    const comments = await Comment.find(
      { postId: req.params.postId },
      { text: 1, _id: 0 }
    );

    res.send(comments);
  } catch (err) {
    console.log(err);
    res.send(err.message);
  }
});
// START SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});