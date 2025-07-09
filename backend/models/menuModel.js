const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Item name is required"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: "Delicious item prepared with care.",
  },
  category: {
    type: String,
    required: [true, "Category is required"],
    enum: ["Starters", "Mains", "Desserts", "Drinks"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price must be positive"],
  },
  image: {
    type: String,
    required: [true, "Image URL is required"],
    default: "https://placehold.co/300x200?text=Food+Image&font=roboto",
  },
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Menu", menuSchema);
