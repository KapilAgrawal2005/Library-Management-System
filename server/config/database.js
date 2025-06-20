const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
  console.log("Attempting to connect to database...");
  console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL environment variable is not set");
    return;
  }

  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database successfully");
    })
    .catch((err) => {
      console.error("Error while connecting to the Database:", err);
      console.error(
        "Database connection failed. Server will continue but database operations will fail."
      );
    });
};
module.exports = { connectDB };
