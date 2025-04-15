import express from "express";
import {
  googleAuth,
  googleCallback,
  googleCallbackRedirect,
  logoutUser,
} from "../controllers/authController.js";

const router = express.Router();

// @desc    Authenticate with Google
// @route   GET /auth/google
router.get("/google", googleAuth);

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get("/google/callback", googleCallback, googleCallbackRedirect);

// @desc    Logout user
// @route   GET /logout
router.get("/logout", logoutUser);

export default router;
