const express = require("express");
const router = express.Router();
const signup = require("../controllers/signup.js");
const login = require("../controllers/login.js");
const userModel = require("../models/user.js");
const { verifyToken } = require("../middleware.js");

router.post("/signup", signup);
router.post("/register", signup);
router.post("/login", login);

router.get("/validate", verifyToken, (req, res) => {
    return res.status(200).json({
        status: 200,
        message: "Token is valid",
        user: req.user
    });
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }
        return res.status(200).json({ status: 200, user });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    }
});

module.exports = router;