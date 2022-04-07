import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ticketsReducer from "../features/tickets/ticketsSlice";
import notesReducer from "../features/notes/notesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketsReducer,
        notes: notesReducer,
    },
});
