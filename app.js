const express = require("express");
const app = express();
const path = require("path");
let items = [];
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("Public"));
app.get("/", (req, res) => {
  let today = new Date();
  console.log(today.toString());
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { typeOfDay: day, items: items });
});
app.post("/", function (req, res) {
  let item = req.body.newItem;
  items.push(item);
  res.redirect("/");
});
app.use("/css", express.static(path.resolve(__dirname, "Public/css")));
app.listen(3000, () => {
  console.log("server is running");
});
