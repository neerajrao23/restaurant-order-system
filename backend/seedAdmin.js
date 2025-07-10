const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const Admin = require("./models/adminModel");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    const existing = await Admin.findOne({ username: "admin" });
    if (existing) {
      console.log("Admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const admin = new Admin({
        username: "admin",
        password: hashedPassword,
      });

      await admin.save();
      console.log("Admin user created successfully");
    }
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
