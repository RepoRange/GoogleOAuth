/**
 * Middleware to ensure the user is authenticated.
 * If authenticated, proceeds to the next middleware/route handler.
 * If not authenticated, redirects to the home page ('/').
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 */
export const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed
  }
  // User is not authenticated, redirect to login/home page
  res.redirect("/");
};
