const express = require("express");
const { addProduct, getProductById, getProducts, reduceStock } = require("../controllers/product_controller.js")

const router = express.Router();

router.post("/", addProduct);
router.get("/:id", getProductById);
router.get("/", getProducts);
router.put("/:id/reduce-stock", reduceStock);

module.exports = router;