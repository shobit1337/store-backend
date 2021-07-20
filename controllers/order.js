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
