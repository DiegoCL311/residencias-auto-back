const { Router } = require("express");
const controlers = require("../controlers/asesores_internos.js");
const app = Router();

// Rutas de productos
app.get("/asesores_internos", controlers.GetReadAsesoresInternos);



module.exports = app;