const express = require("express");
const crypto = require("crypto");
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}
const mongoose = require("mongoose");
const cors = require("cors");
const auth_router = require("./routers/auth_router.js");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/auth_db";

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB (Auth Service)"))
    .catch((err) => console.error("MongoDB Connection Error (Auth Service):", err));

app.get("/api/auth/heartbeat", (req, res) => {
    res.json({
        status: 200,
        message: "Auth service is running"
    });
});

app.use("/api/auth", auth_router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Auth Service is running on port ${PORT}`);
});