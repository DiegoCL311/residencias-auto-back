const { Router } = require("express");
const app = Router();

// respond with "hello world" when a GET request is made to the homepage
app.get("/reportePreliminar", function (req, res) {
  res.send("Respuesta get reportePreliminar1");
});

app.post("/reportePreliminar", function (req, res) {
  res.send("Respuesta post reportePreliminar");
});

app.update("/reportePreliminar", function (req, res) {
  res.send("Respuesta update reportePreliminar");
});

module.exports = app;
