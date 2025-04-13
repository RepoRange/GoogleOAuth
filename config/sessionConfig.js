// config/sessionConfig.js

import MongoStore from 'connect-mongo';

const createSessionConfig = (app) => {
    const isProduction = process.env.NODE_ENV === 'production';

    // Trust proxy in production (needed for secure cookies on platforms like Render)
    if (isProduction) {
        app.set('trust proxy', 1);
    }

    return {
        secret: process.env.secret, // 
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions',
            ttl: 24 * 60 * 60, // 1 day in seconds
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
            httpOnly: true,
            secure: isProduction, // only true in production
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
        }
    };
};

export default createSessionConfig;
