const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());

app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/posts", async (req, res) => {
  try {
    const { title } = req.body;
    const id = randomBytes(4).toString("hex");
    posts[id] = { id, title };
    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: { id, title },
    });
    res.status(201).send(posts[id]);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
});
app.post("/events", (req, res) => {
  console.log(`Event Received : ${req.body.type}`);
  res.status(200).send({ status: "OK" });
});

app.listen(4000, () => {
  console.log("Server is listening on port 4000...");
});
