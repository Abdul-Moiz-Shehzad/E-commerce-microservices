const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        required: true,
        minLength: 3
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;