const jwt = require("jsonwebtoken");
const { jwtSecret } = require("./config");

module.exports = {
  isLoggedIn: async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      const user = jwt.verify(token, jwtSecret);
      // req.body = user;
      req.params.user = user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Invalid token" });
    }
  },
  isAuthenticated: async (req) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      jwt.verify(token, jwtSecret);
      return true;
    } catch {
      return false;
    }
  },
};
