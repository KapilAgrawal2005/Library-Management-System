const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((err) => {
      console.error("Error while connecting to the Database:", err);
    });
};
module.exports = { connectDB };
