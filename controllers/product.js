const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs"); // This is file system it comes by default

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Sorry, Product not found!",
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; // To keep the extensions of our files

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Sorry, File failed to upload",
      });
    }

    // Destructre Fields value
    const { name, description, price, category, stock } = fields;

    // Restrictions on field
    // TODO: Instead of these restrictions on fields, Use express validations
    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "Please include all fields",
      });
    }

    let product = new Product(fields);

    // handling file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is more then 3mb",
        });
      }
      // TODO: Check if we are uplading image only
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Filed to save in DB",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// Middleware to get photo with getProduct
exports.getProductPhoto = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

// Delete
exports.deleteProduct = (req, res) => {
  console.log(req.product);
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product.",
      });
    }
    res.json({
      message: "Succesfully Deleted the product.",
    });
  });
};

// Update
exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true; // To keep the extensions of our files

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Sorry, File failed to upload",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    // handling file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size is more then 3mb",
        });
      }
      // TODO: Check if we are uplading image only
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    // Save to db
    product.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Filed to upadate product in database.",
        });
      }
      res.json(product);
    });
  });
};

// Listing route
exports.getAllProducts = (req, res) => {
  // Note:
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  // TODO: Try more sorting ways
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo") // We added - to not include it.
    .populate("category") //TODO: Read more about populate from mongoose docs
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Sorry! No product found.",
        });
      }
      res.json(products);
    });
};

exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Sorry! No category found",
      });
    }
    res.json(category);
  });
};

// Maintaining Stock with bulk operations
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
      },
    };
  });

  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk Operation Failed.",
      });
    }
    next();
  });
};
