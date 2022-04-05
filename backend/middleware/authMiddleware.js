const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch {
            res.status(404);
            throw new Error("No user found");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized");
    }
});

module.exports = protect;
