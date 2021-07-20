const express = require("express");
const router = express.Router();

const { getOrderById } = require("../controllers/order");

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById, pushOrderInPurchaseList } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

// Prams
router.param("userId", getUserById);
router.param("orderId", getOrderById);

// Actual Routes

module.exports = router;
