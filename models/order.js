const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// We can define multiple schema in a same file but It's not really a good way.
const cartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: "Product",
  },
  name: String,
  count: Number,
  price: Number,
});

const orderSchema = new mongoose.Schema(
  {
    products: [cartSchema],
    transcation_id: {},
    amount: {
      type: Number,
    },
    address: String,
    updated: Date,
    user: {
      type: ObjectId, // whenever we use ObjectID we also need to provide reference of it
      ref: "User",
    },
  },
  { timestamps: true }
);

// Export two things at the same time:
const Order = mongoose.model("Order", orderSchema);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Order, Cart };
