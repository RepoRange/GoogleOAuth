import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.js';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();

// Dynamic callback URL based on environment
const callbackURL = process.env.NODE_ENV === 'production'
    ? 'https://googleoauth-3vf2.onrender.com/auth/google/callback'
    : 'http://localhost:3000/auth/google/callback';

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: callbackURL,
    proxy: true
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(null, existingUser);
        }
        
        const newUser = await User.create({
            googleId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
        });
        
        return done(null, newUser);
    } catch (err) {
        console.error('Google Strategy Error:', err);
        return done(err, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        //console.log('Deserialized User:');
        
        if (!user) {
            return done(null, false, { message: "User not found" });
        }
        return done(null, user);
    } catch (err) {
        console.error('Deserialize Error:', err);
        return done(err, null);
    }
});

export default passport;


