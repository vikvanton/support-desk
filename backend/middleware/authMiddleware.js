const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = await User.findById(decoded.id).select("-password");
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized");
    }
});

module.exports = protect;
