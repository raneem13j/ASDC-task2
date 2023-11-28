// Importing jwt for token handling.
import jwt from "jsonwebtoken";

// Secret key for JWT authentication.
const jwtSecret = "123456";

// Middleware for user authentication using JWT.
export const userAuth = (req, res, next) => {
  // Extracting the token from the request's cookies.
  const auth = req.headers.authorization;
  console.log(auth)
  // Checking if the token is available.
  if (auth) {
    // Splitting the Authorization header to extract the token.
    const token = auth.split(' ')[1];
    console.log(token)
    // Verifying the token using the secret key.
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      // Handling authentication errors.
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } 
      next();
    });
  } else {
    // Responding with an error if the token is not available.
    return res.status(401).json({ message: "Not authorized, token not available" });
  }
};
