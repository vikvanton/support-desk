const { Router } = require("express");
const protect = require("../middleware/authMiddleware");
const { getNotes, createNote } = require("../controllers/noteController");

const router = Router({ mergeParams: true });

router.route("/").get(protect, getNotes).post(protect, createNote);

module.exports = router;
