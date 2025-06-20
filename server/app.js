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
const {
  removeUnverifiedAccounts,
} = require("./services/removeUnverifiedAccounts");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
  })
);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    env: {
      hasJwtSecret: !!process.env.JWT_SECRET_KEY,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasFrontendUrl: !!process.env.FRONTEND_URL,
      hasCookieExpire: !!process.env.COOKIE_EXPIRE,
      hasSmtpHost: !!process.env.SMTP_HOST,
      nodeEnv: process.env.NODE_ENV,
    },
  });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books/", bookRouter);
app.use("/api/v1/borrow", borrowRouter);
app.use("/api/v1/user", userRouter);

notifyUsers();
removeUnverifiedAccounts();
connectDB();

app.use(errorMiddleware);

module.exports = app;
