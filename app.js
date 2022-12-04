const express = require("express");
const connection = require("./database/connection.js");
const conf = require("./config.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())

//Rutas
const products = require("./routes/products");
const reportePreliminar = require("./routes/reportePreliminar");



//Usar rutas
app.use(products);
app.use(reportePreliminar);

app.listen(conf.port, () => {
  console.log(`Example app listening on port ${conf.port}`);
});

connection.getConn().then(() => {
  console.log("Connected to MSSQL");
}).catch(err => console.log("Database Connection Failed! Bad Config: ", err));




