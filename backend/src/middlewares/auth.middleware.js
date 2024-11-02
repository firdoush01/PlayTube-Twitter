import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware to verify JWT and authenticate user
export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // Retrieve token from cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token received:", token); // Logging token for debugging

    // If no token is found, throw an unauthorized error
    if (!token) {
      throw new ApiError(401, "Unauthorized request - Token missing");
    }

    // Verify the JWT using the secret from environment variables
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken); // Logging decoded token

    // Fetch the user by ID from the decoded token, excluding sensitive fields
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

    // If user not found, throw an invalid access token error
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    // Attach the user to the request object for further use
    req.user = user;
    next();
  } catch (error) {
    console.log("JWT verification error:", error.message); // Logging errors
    // Handle specific token expiration errors
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Access Token expired");
    }
    // Catch all other errors related to token verification
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
