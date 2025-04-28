/**
 * GET /
 * Renders the home page.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
export const getIndex = (req, res) => {
  if (req.isAuthenticated()){
    return  res.redirect('/dashboard')
  }
  else res.render("index");
};
