module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json("Unauthorized request. Please log in.");
    }
  };
  