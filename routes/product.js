var express = require("express");
var router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  getProductPhoto,
  deleteProduct,
  updateProduct,
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

// Update and Delete Routes
router.delete(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
router.put(
  "/product/:productId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

// Listing Route

module.exports = router;
