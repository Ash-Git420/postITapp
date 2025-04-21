import mongoose from "mongoose";
import cors from "cors";
import express, { json } from "express";
import UserModel from "./Models/UserModel.js";
import bcrypt from "bcrypt";
import PostModel from "./Models/Post.js";

const app = express();
app.use(express.json());
app.use(cors());

//Database connection
const connectString =
  "mongodb+srv://66S2136294:Admin@postitcluster.e6yrzbr.mongodb.net/postITDb?retryWrites=true&w=majority&appName=postITCluster";
mongoose.connect(connectString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/registerUser", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name: name,
      email: email,
      password: hashedpassword,
    });
    await user.save();
    res.send({ user: user, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(500).json({ error: "User not found!" });
    }
    console.log(user);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401), json({ error: "Authentication failed" });
    }
    res.status(200).json({ user, message: "Success..." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/logout", async (req, res) => {
  res.status(200).json({ message: "Loggged out SUccessfully..." });
});

//POST API - savePost
app.post("/savePost", async (req, res) => {
  try {
    const postMsg = req.body.postMsg;
    const email = req.body.email;
    const post = new PostModel({
      postMsg: postMsg,
      email: email,
    });
    await post.save();
    res.send({ post: post, msg: "Added." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/getPosts", async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    const countPost = await PostModel.countDocuments({});
    res.send({ posts: posts, count: countPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred.." });
  }
});

app.put("/likePost/:postId", async (req, res) => {
  const postId = req.params.postId;
  const userId = req.body.userId;

  try {
    //search the postId if it exists
    const postToUpdate = await PostModel.findOne({ _id: postId });

    if (!postToUpdate) {
      return res.status(404).json({ msg: "Post not found." });
    }
    const userIndex = postToUpdate.likes.users.indexOf(userId);

    if (userIndex !== -1) {
      const updatedPost = await PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: {
            "likes.count": -1,
          },
          $pull: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ post: updatedPost, msg: "Post unliked" });
    } else {
      const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        {
          $inc: { "likes.count": 1 },
          $addToSet: { "likes.users": userId },
        },
        { new: true }
      );
      res.json({ post: updatedPost, msg: "Post Liked" });
    }
  } catch (err) {
    console.error(err);
    res.status(500), json({ error: "an error occurered" });
  }
});



app.listen(3001, () => {
  console.log("You are connected");
});
