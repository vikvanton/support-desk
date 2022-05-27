import { io } from "socket.io-client";
import { store } from "./store";
import { updateTicketStatus } from "../features/tickets/ticketsSlice";
import { createNote } from "../features/notes/notesSlice";
import { toast } from "react-toastify";

let connect_error_flag = false;

const socket = io({
    autoConnect: false,
});

const ticketChangedHandler = ({ ticketId, status }) => {
    store.dispatch(updateTicketStatus({ ticketId, status }));
};

const noteAddedHandler = (newNote) => {
    store.dispatch(createNote({ newNote }));
};

export const connectSocket = (userId) => {
    socket.connect();
    socket.on("tickets", ticketChangedHandler);
    socket.on("notes", noteAddedHandler);
    socket.on("connect", () => {
        if (connect_error_flag) {
            connect_error_flag = false;
            toast.success("Connection to server restored");
            setTimeout(() => window.location.reload(), 5000);
        }
        socket.emit("join", userId.toString());
    });
    socket.on("connect_error", () => {
        if (!connect_error_flag) {
            connect_error_flag = true;
            toast.error("No connection to server");
        }
    });
};

export const closeSocket = (userId) => {
    socket.emit("leave", userId.toString());
    socket.disconnect();
};
