const { Router } = require("express");
const controlers = require("../controlers/products");
const app = Router();

// respond with "hello world" when a GET request is made to the homepage
app.get("/producto", controlers.rutaGet);


module.exports = app;