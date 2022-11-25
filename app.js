const connection = require("./database/connection.js");
const express = require("express");
const app = express();
const conf = require("./config.js");

const products = require("./routes/products");
const reportePreliminar = require("./routes/reportePreliminar");

app.get("/", (req, res) => {
  res.send("Hello World3!");
});

app.use(products);
app.use(reportePreliminar);

app.listen(conf.port, () => {
  console.log(`Example app listening on port ${conf.port}`);
  connection.poolConnect.then(() => {
    console.log("Connected to MSSQL");
  }
  ).catch(err => console.log("Database Connection Failed! Bad Config: ", err));

});

