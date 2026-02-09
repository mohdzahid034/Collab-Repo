import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ADD A USER (test route)
router.post("/add", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ message: "User saved!", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
