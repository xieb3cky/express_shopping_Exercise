const express = require('express');
const app = express();
const ExpressError = require("./expressError");
const router = require('./routes/items');

app.use(express.json());

app.use("/items", router);

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});



module.exports = app;