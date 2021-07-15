var express = require("express");
var router = express.Router();

const { getCategoryById, createCategory } = require("../controllers/category");
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

module.exports = router;
