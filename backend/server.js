const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Support Desk" });
});
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
