const { Schema, model } = require("mongoose");

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = model("User", userSchema);
