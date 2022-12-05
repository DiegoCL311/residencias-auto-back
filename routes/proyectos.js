const { Router } = require("express");
const controlers = require("../controlers/proyectos.js");
const app = Router();

// Rutas de productos
app.get("/proyectos", controlers.GetProyectos);



module.exports = app;