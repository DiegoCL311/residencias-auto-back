const { Router } = require("express");
const controlers = require("../controlers/products");
const app = Router();

// Rutas de productos
app.get("/producto", controlers.rutaGet);
app.post("/producto", controlers.rutaPost);


module.exports = app;