const { Router } = require("express");
const app = Router();

// respond with "hello world" when a GET request is made to the homepage
app.get("/producto", function (req, res) {
  res.send("hello world");
});


module.exports = app;