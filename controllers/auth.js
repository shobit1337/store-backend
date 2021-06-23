// Always keep the name of your controller same as your routes

exports.signup = (req, res) => {
  res.json({
    message: "Sign up works!!",
  });
};

exports.signout = (req, res) => {
  res.json({
    message: "User Signout",
  });
};
