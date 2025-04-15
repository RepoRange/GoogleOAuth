import express from "express";
import { getIndex } from "../controllers/mainController.js";

const router = express.Router();

// @desc    Render Home Page
// @route   GET /
router.get("/", getIndex);

export default router;
