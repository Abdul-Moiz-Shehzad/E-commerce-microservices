const express = require('express');
const { createOrder, getUserOrders } = require('../controllers/order_controller.js');

const router = express.Router();

router.post("/", createOrder);
router.get("/:id", getUserOrders);

module.exports = router;
