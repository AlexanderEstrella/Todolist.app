const express = require("express");
const app = express();
const path = require("path");
const date = require(__dirname + "/date.js");

const items = [];
const workItems = [];
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.get("/", (req, res) => {
  let day = date.getDate();
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
app.listen(5000, () => {
  console.log("server is running");
});
app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work list", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});
