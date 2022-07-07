const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  var day = today.toLocaleDateString("en-US", options);

  res.render("list", { typeOfDay: day });
});

app.listen(3000, () => {
  console.log("server is running");
});
