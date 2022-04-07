import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notesService from "./notesService";

const initialState = {
    notes: [],
    message: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
};

export const getNotes = createAsyncThunk(
    "notes/getNotes",
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notesService.getNotes(ticketId, token);
        } catch (error) {
            const message =
                error?.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const createNote = createAsyncThunk(
    "notes/createNote",
    async ({ noteText, ticketId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await notesService.createNote(noteText, ticketId, token);
        } catch (error) {
            const message =
                error?.response?.data?.message || "Something went wrong";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.notes = action.payload;
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
                state.notes.push(action.payload);
            })
            .addCase(createNote.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = notesSlice.actions;
export default notesSlice.reducer;
