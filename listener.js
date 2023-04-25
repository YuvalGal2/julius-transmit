const emit = require("./emit.js");
const http = require("http");
const express = require("express");
const cors = require("cors");
const hostname = "127.0.0.1";
const port = 4567;

const app = express();
app.use(express.json());
app.use(cors());

app.post("", function (req, res, next) {
  const data = req.body.data;
  const payload = [data.x, data.y];
  console.log(payload);
//  console.log(payload);
  emit.sendMessage(payload);
  res.end();
});

app.listen(4567, function () {
  console.log("CORS-enabled web server listening on port 80");
});

process.on("uncaughtException", function (err) {
  console.error(err);
  // console.log("Node NOT Exiting...");
});
