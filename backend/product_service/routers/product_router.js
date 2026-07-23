const express = require("express");
const { addProduct, getProductById, getProducts } = require("../controllers/product_controller.js")

const router = express.Router();

router.post("/", addProduct);
router.get("/:id", getProductById);
router.get("/", getProducts);

module.exports = router;