/**
 * GET /dashboard
 * Renders the user dashboard. Requires authentication.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
export const getDashboard = (req, res) => {
  res.render("dashboard", {
    user: req.user, // Pass user information from the session to the view
    message: "Welcome back!",
  });
};
