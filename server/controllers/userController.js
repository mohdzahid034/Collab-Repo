import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();
// Register user
router.post("/register", registerUser);
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        const user = await User.create({ name, email, password })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Login user
router.post("/login", loginUser);
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Wrong password" })
        }

        res.json({ message: "Login successful", user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// TEST route (optional)
router.post("/add", (req, res) => {
  res.json({ message: "Test route working!" });
});
export default router;