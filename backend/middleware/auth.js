// middleware/auth.js

const jwt = require("jsonwebtoken");
const secretKey = "MY_SECRET_KEY"; // Load your secret key from a config file

const authenticateToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(token);
    if (token) {
      token = token.split(" ")[1];
      console.log(token);
      let user = jwt.verify(token, secretKey);
      req.email = user.email;
    } else {
      res.status(401).json({ message: "Invalid token!!" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorised user!!" });
  }
};

module.exports = authenticateToken;
