/*********************************************************************************
 *  WEB322 – Lab 3
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: __Zhifen Li____ Student ID: 168833218___ Date: __2013-02-17_____
 *
 *  Cyclic Web App URL: _________https://energetic-seal-tutu.cyclic.app/________
 *
 *  GitHub Repository URL: ____https://github.com/zhifenli/lab3______________
 *
 ********************************************************************************/
const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();
const data = require("./data/data.json");

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static("views"));

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    helpers: {
      strong: (options) => {
        // helper without "context", ie {{#helper}} ... {{/helper}}
        return `<strong>${options.fn(this)}</strong>`;
      },
      row: (index, options) => {
        return index % 2 === 0
          ? `<tr class="table-primary"></tr>`
          : `<tr class="table-danger">`;
      },

      // helper2: function (context, options) {
      //   // helper with "context", ie {{#helper context}} ... {{/helper}}
      // },
    },
  })
);
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.render("viewData", {
    data: data,
    layout: false,
  });
});
app.listen(HTTP_PORT, onHttpStart);
