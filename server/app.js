const express = require("express");
const app = express();
require("dotenv").config();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectDB } = require("./config/database");
const { errorMiddleware } = require("./middleware/errorMiddlewares");
const authRouter = require("./routes/authRouter");
const bookRouter = require("./routes/bookRouter");
const borrowRouter = require("./routes/borrowRouter");
const userRouter = require("./routes/userRouter");
const { notifyUsers } = require("./services/notifyUsers");
const { removeUnverifiedAccounts } = require("./services/removeUnverifiedAccounts");

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
}))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

notifyUsers();
removeUnverifiedAccounts();
connectDB();

app.use(errorMiddleware);

module.exports = app;


