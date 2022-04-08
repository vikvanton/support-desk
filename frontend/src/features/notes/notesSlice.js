import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
    userNotes: [],
    ticketNotes: [],
    message: "",
    isLoading: false,
    isSuccess: false,
    isError: false,
};

export const getNotes = createAsyncThunk(
    "notes/getNotes",
    async (ticketId, thunkAPI) => {
        const state = thunkAPI.getState();
        const ticketNotes = state.notes.userNotes.find(
            (notes) => notes.ticketId === ticketId
        );
        try {
            if (!ticketNotes) {
                const token = state.auth.user.token;
                const response = await notesService.getNotes(ticketId, token);
                return {
                    new: true,
                    result: { ticketId, data: response },
                };
            } else {
                return {
                    new: false,
                    result: ticketNotes,
                };
            }
        } catch (error) {
            const message =
                error?.response?.data?.message || "Unable received notes";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createNote = createAsyncThunk(
    "notes/createNote",
    async ({ noteText, ticketId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const response = await notesService.createNote(
                noteText,
                ticketId,
                token
            );
            return { ticketId, data: response };
        } catch (error) {
            const message =
                error?.response?.data?.message || "Unable added note";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        resetNotes: (state) => {
            state.ticketNotes = [];
            state.isSuccess = false;
        },
        clearNotesError: (state) => {
            state.message = "";
            state.isError = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (action.payload.new) {
                    state.userNotes.push(action.payload.result);
                }
                state.ticketNotes.push(...action.payload.result.data);
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createNote.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                const index = state.userNotes.findIndex(
                    (notes) => notes.ticketId === action.payload.ticketId
                );
                state.userNotes[index].data.push(action.payload.data);
                state.ticketNotes.push(action.payload.data);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { resetNotes, clearNotesError } = notesSlice.actions;
export default notesSlice.reducer;
