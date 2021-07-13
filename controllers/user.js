const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    // whenever there is a database callback it always return two things err and user it found
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }
    req.profile = user;
    next(); // whenever we are getting next, It is always compulsory to call it.
  });
};

exports.getUser = (req, res) => {
  // Removing unnecssorry fields from profile So, It cant be accesed by frontend.
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;

  // Sending json request
  return res.json(req.profile);
};
