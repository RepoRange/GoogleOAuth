// 1. Dependencies/Imports
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import createSessionConfig from "./config/sessionConfig.js";

// Import Routes
import mainRoutes from "./routes/mainRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

// 2. Import Local Configurations
import connectDB from "./config/database.js";
// Import passport configuration for side effects
import "./config/passport.js";

// 3. Initialize Environment Variables
dotenv.config();

// 4. Create Express App
const app = express();
const PORT = process.env.PORT || 3000;

// 5. Database Connection
connectDB();

// 6. View Engine Setup
app.set("view engine", "ejs");

// 7. Basic Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = createSessionConfig(app);
app.use(session(sessionConfig));

// 9. Passport Authentication Middleware Setup


app.use(passport.initialize());
app.use(passport.session());

// 11. Routes Configuration
app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/dashboard", dashboardRoutes);

// 12. Centralized Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).render("error", {
    error: process.env.NODE_ENV === "development" ? err : {},
    message: err.message || "Something went wrong!",
  });
});

// 13. Server Initialization
app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
