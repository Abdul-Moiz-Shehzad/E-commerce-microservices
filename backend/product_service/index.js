const express = require("express");
const crypto = require("crypto");
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}
const mongoose = require("mongoose");
const cors = require("cors");
const product_router = require("./routers/product_router.js");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/product_db";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB (Product Service)"))
    .catch((err) => console.error("MongoDB Connection Error (Product Service):", err));

app.get("/api/products/heartbeat", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Product Service is running"
    });
});

app.use("/api/products", product_router);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Product Service is running on port ${PORT}`);
});