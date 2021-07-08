var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

// we apply express-validator after the routes and before the controllers
router.post(
  "/signup",
  [
    // you can put as many checks as you like
    check(
      "name",
      "Your Message here!! Name should be atleat 3 character!"
    ).isLength({ min: 3 }),
    check("email", "Email is required!").isEmail(),
    check("password", "Password should be atleast 8 letter long!").isLength({
      min: 8,
    }),
  ],
  signup
);
router.get("/signout", signout);

module.exports = router;
