const express = require("express");

const {
  getAllproducts,
  createProduct,
  updateProduct,
  deletProduct,
  getProductDetails,
} = require("../controller/productController");
const router = express.Router();

router.route("/products").get(getAllproducts);
router.route("/products/new").post(createProduct);
router
  .route("/products/:id")
  .put(updateProduct)
  .delete(deletProduct)
  .get(getProductDetails);

module.exports = router;
