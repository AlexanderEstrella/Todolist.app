const express = require("express");
const app = express();
const path = require("path");
const date = require("./date");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

const items = [];
const workItems = [];
console.log(defaultItems);
app.get("/", (req, res) => {
  let day = date.getDate();

  items.find(function (err, results) {
    console.log(results);
  });

  res.render("list", { ListTitle: day, newListItems: items });
});
app.post("/", function (req, res) {
  let item = req.body.newItem;
  if (req.body.list === "Work") {
    console.log(req.body);
    workItems.push(item);
    res.redirect("/work");
  } else {
    console.log(req.body);
    items.push(item);
    res.redirect("/");
  }
});
app.use("/css", express.static(path.resolve(__dirname, "Public/css")));

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work list", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

module.exports = app;
