const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());

app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.status(200).send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  try {
    const { content } = req.body;
    const commentId = randomBytes(4).toString("hex");
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content: content, status: "pending" });
    commentsByPostId[req.params.id] = comments;
    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        content,
        postId: req.params.id,
        status: "pending",
      },
    });
    res.send(comments);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
});

app.post("/events", async (req, res) => {
  console.log(`Event Received : ${req.body.type}`);
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { id, status, postId, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: { id, content, status, postId },
      });
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  }
  res.send({ status: "OK" });
});

app.listen(4001, () => {
  console.log("Server is listening on port 4001...");
});
