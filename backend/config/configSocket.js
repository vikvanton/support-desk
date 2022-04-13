const { Server } = require("socket.io");

let io = null;

const ticketsUpdate = (ticketId, userId, status) => {
    io.to(userId.toString()).emit("tickets", { ticketId, status });
};

const noteInsert = (newNote) => {
    io.to(newNote.user.toString()).emit("notes", newNote);
};

const configSocket = (server) => {
    io = new Server(server);
    io.on("connection", (socket) => {
        console.log("socket connected");
        socket.on("join", (data) => {
            socket.join(data);
        });
        socket.on("leave", (data) => {
            socket.leave(data);
        });
        socket.on("disconnect", () => {
            console.log("socket disconnected");
        });
    });
};

module.exports = {
    configSocket,
    ticketsUpdate,
    noteInsert,
};
