// Importing jwt for token handling.
import jwt from "jsonwebtoken";

// Secret key for JWT authentication.
const jwtSecret = "123456";

// Middleware for user authentication using JWT.
export const userAuth = (req, res, next) => {
  // Extracting the token from the request's cookies.
  const token = req.cookies.jwt;

  // Checking if the token is available.
  if (token) {
    // Verifying the token using the secret key.
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      // Handling authentication errors.
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        // Checking if the user role is "Basic" for authorization.
        if (decodedToken.role !== "Basic") {
          return res.status(401).json({ message: "Not authorized" });
        } else {
          // Passing control to the next middleware or route handler.
          next();
        }
      }
    });
  } else {
    // Responding with an error if the token is not available.
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};
