const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    status: {
        type: String,
        default: "SUCCESS"
    }
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
