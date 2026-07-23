const Order = require("../models/order_model.js");

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL || "http://localhost:3001";
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:3002";

const createOrder = async (req, res) => {
    try {
        const { id, productId, quantity, userId } = req.body;
        const targetProductId = productId || id;

        if (!targetProductId || !userId || !quantity) {
            return res.status(400).json({
                status: 400,
                message: "userId, productId (or id), and quantity are required"
            });
        }

        const productRes = await fetch(`${PRODUCT_SERVICE_URL}/api/products/${targetProductId}`);
        if (!productRes.ok) {
            return res.status(404).json({ status: 404, message: "Product not found in Product Service" });
        }
        const productData = await productRes.json();

        if (productData.stock !== undefined && productData.stock < quantity) {
            return res.status(400).json({
                status: 400,
                message: `Insufficient product stock. Available: ${productData.stock}`
            });
        }

        const userRes = await fetch(`${AUTH_SERVICE_URL}/api/auth/${userId}`);
        if (!userRes.ok) {
            return res.status(404).json({ status: 404, message: "User not found in Auth Service" });
        }

        await fetch(`${PRODUCT_SERVICE_URL}/api/products/${targetProductId}/reduce-stock`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ quantity })
        });

        const newOrder = await Order.create({
            userId,
            productId: targetProductId,
            quantity
        });

        return res.status(201).json({
            status: 201,
            message: "Order created successfully",
            order: newOrder
        });

    } catch (error) {
        console.error("Create Order Error:", error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

const getUserOrders = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.find({ userId: id });

        return res.status(200).json(orders);
    } catch (error) {
        console.error("Get User Orders Error:", error);
        return res.status(500).json({ status: 500, message: error.message });
    }
};

module.exports = { createOrder, getUserOrders };