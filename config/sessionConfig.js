// config/sessionConfig.js

import MongoStore from 'connect-mongo';

const createSessionConfig = (app) => {
    const isProduction = process.env.NODE_ENV === 'production';

    // Trust proxy in production (needed for secure cookies on platforms like Render)
    //User Browser  ─── HTTPS ───▶  Render Proxy ─── HTTP ───▶  Express App
    //Heroku terminates HTTPS → sends HTTP to your app
    
    //Express sees: HTTP "This is not secure!"
    
    //Secure session cookies won't be sent (session/login breaks)
    //this allows the app to trust the proxy and treat the request as secure and send the secure cookie
    if (isProduction) {
        app.set('trust proxy', 1);
    }

console.log('in sessionConfig.js');




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
