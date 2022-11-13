const express = require("express");
const app = express();
const port = 3002;

const products = require("./routes/products");
const reportePreliminar = require("./routes/reportePreliminar");

app.get("/", (req, res) => {
  res.send("Hello World3!");
});

app.use(products);
app.use(reportePreliminar);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
