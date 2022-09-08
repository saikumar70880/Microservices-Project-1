const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  try {
    await axios.post("http://localhost:4000/events", event);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
  try {
    await axios.post("http://localhost:4001/events", event);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
  try {
    await axios.post("http://localhost:4002/events", event);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
  try {
    await axios.post("http://localhost:4003/events", event);
  } catch (error) {
    console.log(`Error : ${error.message}`);
  }
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("Service is listening on port 4005...");
});
