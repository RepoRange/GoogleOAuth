import express from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js"; // We'll create this next

const router = express.Router();

// @desc    Show Dashboard
// @route   GET /dashboard
router.get("/", ensureAuthenticated, getDashboard); // Apply auth middleware here

export default router;
