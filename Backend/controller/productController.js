const Products = require("../Models/productModels");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const Apifeatures = require("../utils/apifeatures");
exports.createProduct = catchAsyncError(async (req, res, next) => {
  const product = await Products.create(req.body);
  res.status(201).json({ sucess: true, product });
});

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  res.status(200).json({ sucess: true, product });
});

exports.getAllproducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await Products.countDocuments();
  const apifeature = new Apifeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({ sucess: true, products, productCount });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const iddd = req.params.id;
  const product = await Products.findById(iddd);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  const produt = await Products.findByIdAndUpdate(iddd, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ sucess: true, produt });
});

exports.deletProduct = catchAsyncError(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found ", 404));
  }
  await product.remove();
  res
    .status(200)
    .json({ sucess: true, message: "product deleted successfully" });
});
