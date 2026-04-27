// start your backend for the project with this file
const path = require("path");

const express = require("express");
const serveIndex = require("serve-index");
const bodyParser = require("body-parser");

const app = express();
const formParser = bodyParser.urlencoded({ inflate: false });

const formUrl = "/form";
const formErrorPage = "/form-error.html";

const rooms = new Map();

app.post(formUrl, formParser, (req, res, next) => {
  const formData = req.body;
  console.log("formData: %o", formData);

  const requested_time = new Date(formData.booking_start);

  const isValid = true;
  if (!isValid) {
    res.redirect(302, formErrorPage);
    return;
  }

  rooms.set(
});

// view
app.get(formUrl, (req, res) => {

});

const webRoot = path.join(__dirname, "..", "frontend");
app.use("/", express.static(webRoot), serveIndex(webRoot, {}));

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
