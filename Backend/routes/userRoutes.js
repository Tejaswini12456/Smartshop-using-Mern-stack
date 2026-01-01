import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Auth routes
router.post("/signup", registerUser); // frontend uses /signup
router.post("/login", loginUser);

// Protected profile route
router.get("/profile", protect, getUserProfile);

export default router;
