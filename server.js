const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB CONNECTION SUCCESS");
  });
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

//item
//.deleteOne({ _id: "634b04b5609b550f230c5b70" })
//.then(function () {
//  console.log("data inserted successfully");
//})
//.catch(function (error) {
// console.log(error);
//});
/*.insertMany(defaultItems)
  .then(function () {
    console.log("Data inserted succesfully");
  })
  .catch(function (error) {
    console.log(error);
  }); */

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 3000");
});
