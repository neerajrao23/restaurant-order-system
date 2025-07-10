const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminAuthRoutes = require('./routes/adminAuth');

//environment variables
dotenv.config();
const PORT = process.env.PORT || 8080;
const dbUri = process.env.MONGO_URI;

//Middlewares
app.use(cors());
app.use(express.json());

//MongoDB connection
mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminAuthRoutes);

//Root
app.use("/", (req, res) => {
  res.send("Backend is Working");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
