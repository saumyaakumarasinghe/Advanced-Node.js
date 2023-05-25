const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // const token = authHeader ? authHeader.split(' ')[1] : null;
    if (token == null) return res.sendStatus(401);  // User have not send a token

    const decode = jwt.verify(token, 'advancedNode');  // Verify the given token
    req.user = decode.data;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth Failed",
    });
  }
};
