const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const date = require("./date");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));

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

const listSchema = {
  name: String,
  items: [itemSchema],
};

const List = mongoose.model("List", listSchema);

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
// checking if a list already exist and creating more lists
app.get("/:any", (req, res) => {
  if (req.params.any != "favicon.ico") {
    const CustomizedItem = req.params.any;
    //  finds new collection
    List.findOne({ name: CustomizedItem }, function (err, foundlist) {
      if (!err) {
        // creates new list if a collection is not found
        if (!foundlist) {
          const list = new List({
            name: CustomizedItem,
            items: defaultItems,
          });
          list.save();
          res.redirect("/" + CustomizedItem);
        } else {
          // renders items to may page
          res.render("list", {
            ListTitle: foundlist.name,
            newListItems: foundlist.items,
          });
        }
      }
    });
  }
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
// deleting items from out database
app.post("/delete", (req, res) => {
  const checkedItemid = req.body.checkeditem;
  item.findOneAndDelete({ _id: checkedItemid }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("item was deleted");
      res.redirect("/");
    }
  });
});

app.use("/css", express.static(path.resolve(__dirname, "Public/css")));

app.get("/work", function (req, res) {
  res.render("list", { ListTitle: "Work list", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

module.exports = app;
