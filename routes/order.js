const express = require("express");
const router = express.Router();

const { getOrderById, createOrder } = require("../controllers/order");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

// Prams
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Routes
router.post(
  "/order/create/:userId",
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateStock,
  createOrder
);

module.exports = router;
