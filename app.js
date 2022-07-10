const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  var today = new Date();
  console.log(today.toString());
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { typeOfDay: day });
});
app.post("/", function (req, res) {
  let item = req.body.newItem;
  console.log(item);
});
app.listen(3000, () => {
  console.log("server is running");
});
