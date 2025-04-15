/**
 * GET /
 * Renders the home page.
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 */
export const getIndex = (req, res) => {
  res.render("index");
};
