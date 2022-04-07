const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");

//@route    GET /api/tickets/:id/notes
//@access   Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({
        user: req.user.id,
        ticket: req.params.id,
    });
    res.status(200).json(notes);
});

//@route    POST /api/tickets/:id/notes
//@access   Private
const createNote = asyncHandler(async (req, res) => {
    const { text } = req.body;
    if (!text) {
        res.status(400);
        throw new Error("Please add a text");
    }

    const note = await Note.create({
        user: req.user.id,
        ticket: req.params.id,
        text,
    });
    res.status(201).json(note);
});

module.exports = {
    getNotes,
    createNote,
};
