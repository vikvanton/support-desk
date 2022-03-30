const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res) => {
    const { product, description } = req.body;
    if (!product || !description) {
        res.status(400);
        throw new Error("Please add a product and description");
    }

    const ticket = await Ticket.create({
        user: req.user.id,
        product,
        description,
        status: "new",
    });
    res.status(201).json(ticket);
});

//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find({ user: req.user.id });
    res.status(200).json(tickets);
});

//@route    GET /api/tickets/:id
//@access   Private
const getTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findOne({
        _id: req.params.id,
        user: req.user.id,
    });
    if (!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    res.status(200).json(ticket);
});

//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res) => {
    const updateResult = await Ticket.updateOne(
        {
            _id: req.params.id,
            user: req.user.id,
        },
        {
            product: req.body.product,
            description: req.body.description,
            status: req.body.status,
        }
    );
    if (updateResult.modifiedCount === 0) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    res.status(200).json(updateResult);
});

//@route    DELETE /api/tickets/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res) => {
    const deleteResult = await Ticket.deleteOne({
        _id: req.params.id,
        user: req.user.id,
    });
    if (deleteResult.deletedCount === 0) {
        res.status(404);
        throw new Error("Ticket not found");
    }
    res.status(200).json(deleteResult);
});

module.exports = {
    createTicket,
    getTickets,
    getTicket,
    updateTicket,
    deleteTicket,
};
