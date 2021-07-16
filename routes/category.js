var express = require("express");
var router = express.Router();

const {
  getCategoryById,
  createCategory,
  getCategory,
  getAllCategory,
} = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById); // this get called automatically when :userId is used in the paramaeter.
router.param("categoryId", getCategoryById);

//routes
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("category/:categoryId", getCategory);
router.get("categories", getAllCategory);

module.exports = router;
