const mongoose = require("mongoose");
require('dotenv').config();
const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to the database");
    }).catch((err)=>{console.log("Error while connecting to the Database",err)});
};
module.exports = { connectDB };