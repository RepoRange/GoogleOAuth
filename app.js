// 1. Dependencies/Imports
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import createSessionConfig from './config/sessionConfig.js';

// 2. Import Local Configurations
import connectDB from './config/database.js';
import passportConfig from './config/passport.js';

// 3. Initialize Environment Variables
dotenv.config();

// 4. Create Express App
const app = express();
const PORT = process.env.PORT || 3000;

// 5. Database Connection
connectDB();

// 6. View Engine Setup
app.set('view engine', 'ejs');

// 7. Basic Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = createSessionConfig(app);
app.use(session(sessionConfig));




// 9. Authentication Middleware Setup
app.use(passport.initialize());
app.use(passport.session());

// 10. Authentication Middleware Function
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

// 11. Routes Configuration
// Public Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Authentication Routes
app.get('/auth/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/',
        failureFlash: false,
    }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// Protected Routes
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user,
        message: "Welcome back!"
    });
});

// Auth Management Routes
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

// 12. Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: err });
});

// 13. Server Initialization
app.listen(PORT, () => {
    console.log(`Server is running...`);
});



