const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId, // references a menu item
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    tableNumber: {
      type: String, // string to allow "A1", "T3", etc.
      required: [true, "Table number is required"],
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
