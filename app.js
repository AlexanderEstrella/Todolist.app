const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const date = require("./date");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

const items = [];
const workItems = [];

const itemSchema = new mongoose.Schema({
  name: String,
});

const item = mongoose.model("items", itemSchema);

const item1 = new item({
  name: "welcome to your todolist!",
});

const item2 = new item({
  name: "hit the + button to aff a new item",
});
const item3 = new item({
  name: "<---hit this to delete an item",
});
const defaultItems = [item1, item2, item3];

//inserting the received items to our database if request not received - default get sent
app.get("/", (req, res) => {
  let day = date.getDate();
  item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("succesfully saved default itemts to DB");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", { ListTitle: day, newListItems: foundItems });
    }
  });
});
// adding new items to database/home route
app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const Item = new item({
    name: itemName,
  });
  Item.save();
  res.redirect("/");
});

app.use("/css", express.static(path.resolve(__dirname, "Public/css")));

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work list", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

module.exports = app;
