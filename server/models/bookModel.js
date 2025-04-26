const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true,
    },
    author:{
        type: String,
        required: true,
        trim: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    quantity:{
        type: String,
        required: true,
    },
    availability:{
        type: Boolean,
        default:true,
    },  
},{
    timestamps:true,
});


module.exports = mongoose.model("Book",bookSchema);