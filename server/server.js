const app = require("./app.js");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Check for required environment variables
const requiredEnvVars = [
  "DATABASE_URL",
  "JWT_SECRET_KEY",
  "JWT_EXPIRE",
  "COOKIE_EXPIRE",
  "FRONTEND_URL",
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
