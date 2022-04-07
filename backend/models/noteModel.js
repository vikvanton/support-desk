const { Schema, model } = require("mongoose");

const noteSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        ticket: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Tiket",
        },
        text: {
            type: String,
            required: [true, "Please add some text"],
        },
        isStaff: {
            type: Boolean,
            default: false,
        },
        staffId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Note", noteSchema);
