import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketsService";

const initialState = {
    tickets: null,
    ticket: null,
    message: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
};

export const createTicket = createAsyncThunk(
    "tickets/createTicket",
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            const message =
                error?.response?.data?.message || "Unable create ticket";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getTickets = createAsyncThunk(
    "tickets/getTickets",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token);
        } catch (error) {
            const message =
                error?.response?.data?.message || "Unable receive tickets";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const closeTicket = createAsyncThunk(
    "tickets/closeTicket",
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.closeTicket(ticketId, token);
        } catch (error) {
            const message =
                error?.response?.data?.message || "Unable close ticket";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState,
    reducers: {
        reset: (state) => {
            state.ticket = null;
            state.message = "";
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
        },
        receiveTicket: (state, action) => {
            state.ticket = state.tickets.find(
                (ticket) => ticket._id === action.payload
            );
        },
        updateTicketStatus: (state, action) => {
            state.tickets.map((ticket) =>
                ticket._id === action.payload.ticketId
                    ? (ticket.status = action.payload.status)
                    : ticket
            );
        },
        clearTickets: (state) => {
            state.tickets = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.tickets) {
                    state.tickets.push(action.payload);
                }
            })
            .addCase(createTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getTickets.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets = action.payload;
            })
            .addCase(getTickets.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(closeTicket.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(closeTicket.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tickets.map((ticket) =>
                    ticket._id === action.payload._id
                        ? (ticket.status = "closed")
                        : ticket
                );
            })
            .addCase(closeTicket.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, receiveTicket, updateTicketStatus, clearTickets } =
    ticketsSlice.actions;
export default ticketsSlice.reducer;
