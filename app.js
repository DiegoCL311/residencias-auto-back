const express = require("express");
const connection = require("./database/connection.js");
const conf = require("./config.js");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())

//Rutas
//const products = require("./routes/products");
const reportePreliminar = require("./routes/reportePreliminar");
const asesores_internos = require("./routes/asesores_internos");
const proyectos = require("./routes/proyectos");


//Usar rutas

app.use(reportePreliminar);
app.use(asesores_internos);
app.use(proyectos);

app.listen(conf.port, () => {
  console.log(`Example app listening on port ${conf.port}`);
});

connection.getConn().then(() => {
  console.log("Connected to MSSQL");
}).catch(err => console.log("Database Connection Failed! Bad Config: ", err));




