import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

export const signInOrUp = createAsyncThunk(
    "auth/signInOrUp",
    async (userData, thunkAPI) => {
        try {
            return await authService.signInOrUp(userData);
        } catch (error) {
            const message =
                error?.response?.data?.message || "Unable log in/up";
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
    await authService.signOut();
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signInOrUp.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signInOrUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(signInOrUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.message = action.payload;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
