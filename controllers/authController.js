import passport from "passport";

/**
 * GET /auth/google
 * Initiates the Google OAuth 2.0 authentication flow.
 */
export const googleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
  prompt: "select_account",
  accessType: "offline",
  prompt: "consent", // Force account selection each time
});

/**
 * GET /auth/google/callback
 * Handles the callback from Google after authentication.
 * Redirects to the dashboard on success or home page on failure.
 */
export const googleCallback = passport.authenticate("google", {
  failureRedirect: "/", // Redirect back to the home page if auth fails
  failureFlash: false, // Optionally, disable flash messages on failure
});

/**
 * Redirects to the dashboard after successful Google authentication.
 * This middleware runs *after* successful authentication from googleCallback.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
export const googleCallbackRedirect = (req, res) => {
  res.redirect("/dashboard");
};

/**
 * GET /logout
 * Logs the user out and redirects to the home page.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const logoutUser = (req, res, next) => {
 /*three things to do
 *remove the user from tht session
 *destroy the session from the store 
 *clear the cookie from the browser
 finally redirect to the home page */

 req.logout((err)=>{
  const isProduction = process.env.NODE_ENV === 'production';
  if(err) return next (err);

  req.session.destroy((err)=>{
    //console.log("Session destroyed",err);
    if(err) return next(err);

  })
  res.clearCookie("connect.sid",{
    path:"/",
    httpOnly:true,
    secure: isProduction,
    sameSite:isProduction ? "none" : "lax", 
  });
  res.redirect("/");
 // console.log("User logged out and session destroyed");

 });







};
