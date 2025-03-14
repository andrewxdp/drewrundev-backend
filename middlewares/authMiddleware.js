const jwt = require("jsonwebtoken");
const [JWT_SECRET] = require("../config/config");

const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.cookies.token;
    if (!authToken) {
      return res.status(401).json({
        message: "Authentication token not found",
      });
    }
    const userAuth = jwt.verify(authToken, JWT_SECRET);
    req.user = userAuth;
    next();
  } catch (error) {
    console.error("Authentication error", error);
    return res.status(401).json({
      message: "Authentication failed",
      error,
    });
  }
};

module.exports = authMiddleware;
