const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const express = require("express");

const db = low(new FileSync("db.json"));
db.defaults({
  count: 0
}).write();

const server = express();
server.post("/add", (req, res) => {
  const count = db.get("count").value();
  db.assign({ count: count + 1 }).write();
});

server.get("/count", (req, res) => {
  const count = db.get("count").value();
  res.json({ count });
});

server.listen(process.env.PORT || 3000);
