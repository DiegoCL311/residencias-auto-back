const { Router } = require("express");
const controlers = require("../controlers/reportePreliminar.js");
const app = Router();

// Rutas de productos
app.get("/reportePreliminar", controlers.GetReadReportes);
app.post("/reportePreliminar", controlers.PostCreateReporte);


module.exports = app;