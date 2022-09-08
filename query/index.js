const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.use(express.json());

const posts = {};

const eventHandler = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  eventHandler(type, data);
  res.send({ status: "OK" });
});

app.listen(4002, async () => {
  console.log("Service is listening on port 4002...");
  try {
    const response = await axios.get("http://localhost:4005/events");
    for (let event of response.data) {
      eventHandler(event.type, event.data);
    }
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
});
