const user = require("../models/user.js");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await user.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                status: 400,
                message: "User already exists",
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                status: 400,
                message: "Password must be at least 8 characters long",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await user.create({
            username,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            status: 201,
            message: "User created successfully",
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error",
        });
    }
};

module.exports = signup;