var express = require("express");
var router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getProductPhoto,
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Params
router.param("userId", getUserById);
router.param("productId", getProductById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

// Get Product
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", getProductPhoto);

module.exports = router;
