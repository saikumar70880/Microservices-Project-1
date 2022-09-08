const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    try {
      await axios.post("http://localhost:4005/events", {
        type: "CommentModerated",
        data: { ...data, status },
      });
    } catch (error) {
      console.log(`Error : ${error.message}`);
    }
  }
  res.send({ status: "OK" });
});

app.listen(4003, () => {
  console.log("Service is listening on port 40003...");
});
