const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://collab-repo.vercel.app"
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB error:", err));
  
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.listen(5000, () => console.log("Server running on port 5000"));


import userRoutes from "./routes/userRoutes.js";
app.use("/api/users", userRoutes);
