var express = require("express");
var router = express.Router();

const { getCategoryById } = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById); // this get called automatically when :userId is used in the paramaeter.
router.param("categoryId", getCategoryById);

module.exports = router;
