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
  console.log("Hello");
  res.send("Hello");
});

app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.js"));
});

app.get("/viewData", (req, res) => {
  res.render("viewData", {
    data: data,
    layout: false,
  });
});
app.listen(HTTP_PORT, onHttpStart);
