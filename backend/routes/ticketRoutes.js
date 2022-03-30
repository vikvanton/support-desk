const { Router } = require("express");
const protect = require("../middleware/authMiddleware");
const {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket,
} = require("../controllers/ticketController");

const router = Router();

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
    .route("/:id")
    .get(protect, getTicket)
    .put(protect, updateTicket)
    .delete(protect, deleteTicket);

module.exports = router;
