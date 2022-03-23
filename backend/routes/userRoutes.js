const { Router } = require("express");
const protect = require("../middleware/authMiddleware");
const {
    registerUser,
    loginUser,
    getMe,
} = require("../controllers/userControlles");

const router = Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
