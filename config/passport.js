import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.js';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // Updated callback URL for production
    callbackURL: 'https://googleoauth-3vf2.onrender.com/auth/google/callback',
    // Add proxy configuration for secure HTTPS
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // check if user already exists in our db
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            // user already exists
            return done(null, existingUser);
        }
        // if not, create new user in our db
        const newUser = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
        });
        await newUser.save();
        done(null, newUser);
    } catch (err) {
        console.error(err);
        done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    try {
        const user = User.findById(id);
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        done(null, user);
    } catch (err) {
        console.error(err);
        done(err, null);
    }
});

export default passport;


