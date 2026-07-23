const express = require("express");
const crypto = require("crypto");
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}
const mongoose = require("mongoose");
const cors = require("cors");
const order_router = require("./routers/order_router.js");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/order_db";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB (Order Service)"))
    .catch((err) => console.error("MongoDB Connection Error (Order Service):", err));

app.get("/api/orders/heartbeat", (req, res) => {
    return res.status(200).json({
        message: "Order Service is running",
        status: 200
    });
});

app.use("/api/orders", order_router);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Order Service is running on port ${PORT}`);
});