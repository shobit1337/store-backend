const { Order, Cart } = require("../models/order");

// Param controller
exports.getOrderById = (req, res, next, id) => {
  Order.find(id)
    .populate("products.product", "name price") // TODO: confusing, understand better in frontend
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Sorry! No order found in database",
        });
      }
      res.order = order;
      next();
    });
};

// Create order route
exports.createOrder = (req, res) => {
  req.body.order.user = req.profiles;
  const order = new Order(req.body.order);

  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to create your order.",
      });
    }
    res.json(order);
  });
};

// Get All orders for admin
exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "Sorry! No orders found.",
        });
      }
      res.json(orders);
    });
};

// Status Controllers
exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, updatedStatus) => {
      if (err) {
        return res.status(400).json({
          error: "Sorry! Failed to update order status.",
        });
      }
      res.json(updatedStatus);
    }
  );
};
