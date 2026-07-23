const Product = require("../models/product_model.js");

const addProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;
        if (!name || !price || !description || !stock) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if (price < 0) {
            return res.status(400).json({ message: "Invalid price value" })
        }
        if (stock < 0) {
            return res.status(400).json({ message: "Invalid stock value" })
        }
        const product = await Product.create({
            name,
            price,
            description,
            stock
        })
        return res.status(201).json({ message: "Product added successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json(product);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = { addProduct, getProductById, getProducts }
