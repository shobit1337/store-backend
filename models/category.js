const mongoose = require("mongoose");

var categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
    },
  },
  { timestamps: true } // It will take the time when we it was created
);

module.exports = mongoose.model("Category", categorySchema);
