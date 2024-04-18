const jwt = require("jsonwebtoken");
import { User } from '../model/user';
require('dotenv').config({
  path: '/src/config/.env',
});

exports.isAuthenticated = async (req:  any, res: any, next: any) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      // If token is missing, return an error response
      return next(new ErrorHandler("Login first to access this resource", 401));
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    // Find the user associated with the decoded token
    const user = await User.findById(decoded.id);
  
    if (!user) {
      // If user is not found, return an error response
      return next(new ErrorHandler("User not found", 404));
    }
  
    // Attach the user to the request object
    req.user = user;
  
    // Continue with the next middleware
    next();
  } catch (err) {
    // Log the error
    console.error("Authentication error:", err);
    // If an error occurs during token verification, return an error response
    return next(new ErrorHandler("Invalid token", 401));
  }
};
