const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });

// connecting mongodb using mongoose- ID in encrypted file
const DB = process.env.DATABASE_URL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB CONNECTION SUCCESS");
  });

// adding port number to app
app.listen(process.env.PORT || 5000, () => {
  console.log("server is running on port 3000");
});
