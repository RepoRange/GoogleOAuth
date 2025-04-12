import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passportConfig from './config/passport.js';




// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
import connectDB from './config/database.js';
connectDB();

// View engine setup
app.set('view engine', 'ejs');

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "your-secret-key",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
            ttl: 24 * 60 * 60,
            autoRemove: "native",
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === 'production',
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Authentication middleware
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
};

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// OAuth Routes
app.get('/auth/google',
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        prompt: 'select_account'
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { 
        failureRedirect: '/',
        failureFlash: true
    }),
    (req, res) => {
        res.render("dashboard", {
            user: req.user,
            message: "Welcome to your dashboard!"
        });
    }
);

// Protected Route Example
app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', {
        user: req.user,
        message: "Welcome back!"
    });
});

// Logout Route
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { error: err });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running `);
});



