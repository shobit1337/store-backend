var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    maxlength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    maxlength: 32,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  userinfo: {
    type: String,
    trim: true,
  },
  encrypt_password: {
    type: String,
    required: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

// Virtual Fields
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password; // storing our passowrd in a private variable
    this.salt = uuidv1();
    this.encrpt_password = this.encrptPassword(password);
  })
  .get(function () {
    return this._password; // In case someone need the password
  });

// Schema Methods - Create as much you want..
userSchema.method = {
  authenticate: function (plainPassword) {
    return this.encrptPassword(plainPassword) === this.encrpt_password;
  },

  encrptPassword: function (plainPassword) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
