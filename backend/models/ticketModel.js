const { Schema, model } = require("mongoose");

const ticketSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        product: {
            type: String,
            required: [true, "Please select a product"],
            enum: ["PC", "Laptop", "Tablet", "Smartphone"],
        },
        description: {
            type: String,
            required: [true, "Please enter a description of the issue"],
        },
        status: {
            type: String,
            required: true,
            enum: ["new", "open", "closed"],
            default: "new",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Ticket", ticketSchema);
