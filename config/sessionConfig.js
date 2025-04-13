import MongoStore from 'connect-mongo';

const createSessionConfig = (app) => {
    const baseConfig = {
        secret: process.env.secret,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: "sessions",
            ttl: 24 * 60 * 60,
        }),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            httpOnly: true,
            path: '/',
        }
    };

    if (process.env.NODE_ENV === 'production') {
        // Production settings
        baseConfig.cookie.secure = true;
        baseConfig.cookie.sameSite = 'strict';
        baseConfig.cookie.domain = 'googleoauth-3vf2.onrender.com';
        app.set('trust proxy', 1);
    } else {
        // Development settings
        baseConfig.cookie.secure = false;
        baseConfig.cookie.sameSite = 'lax';
    }

    return baseConfig;
};

export default createSessionConfig;