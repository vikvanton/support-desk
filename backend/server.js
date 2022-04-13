const express = require("express");
const errorHandler = require("./middleware/errorMiddleware");
const configDb = require("./config/configDb");
const { configSocket } = require("./config/configSocket");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandler);

const server = app.listen(PORT, () =>
    console.log(`Server started at port ${PORT}`)
);

configSocket(server);
configDb();
