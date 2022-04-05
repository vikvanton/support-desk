import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import ticketsReducer from "../features/tickets/ticketsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        tickets: ticketsReducer,
    },
});
