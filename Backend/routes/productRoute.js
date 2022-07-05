const express = require("express");

const {
  getAllproducts,
  createProduct,
  updateProduct,
  deletProduct,
  getProductDetails,
} = require("../controller/productController");
const { isAuthenticatedUser,authorizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllproducts);
router.route("/products/new").post(isAuthenticatedUser,authorizeRole("admin"),createProduct);
router
  .route("/products/:id")
  .put(isAuthenticatedUser,authorizeRole("admin"),updateProduct)
  .delete(isAuthenticatedUser,authorizeRole("admin"),deletProduct)
  .get(getProductDetails);

module.exports = router;
