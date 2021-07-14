const User = require("../models/user");
const Order = require("../models/order");

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
  req.profile.encrypt_password = undefined;

  // Sending json request
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body }, // the values we want to update we pass them with $ sign
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encrypt_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({
    user: req.profile._id,
  })
    .populate("user", "_id name") // Read more about populate in mongoose docs
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order Found!",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) =>
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    })
  );

  // Store it in database
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true }, // when we set new to true => from db send me back the obj that is updated one, not the old one
    (err, purchase) => {
      if (err) {
        return res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};
