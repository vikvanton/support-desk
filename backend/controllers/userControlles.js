const asyncHandler = require("express-async-handler");

//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please include all fields");
    }
    res.send("Register Route");
});

//@route    /api/users/login
//@access   Public
const loginUser = (req, res) => {
    res.send("Login Route");
};

module.exports = {
    registerUser,
    loginUser,
};
