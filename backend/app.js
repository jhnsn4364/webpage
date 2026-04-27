// start your backend for the project with this file
const express = require("express");
const serveIndex = require("serve-index");
const app = express();

app.post("/form", (req, res) => {
  res.send("hello world");
});

app.use("/", express.static("."), serveIndex(".", {}));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
