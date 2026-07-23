const userModel = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../middleware.js");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Email and password are required"
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found, please signup first"
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            token,
            userId: user._id,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
};

module.exports = login;