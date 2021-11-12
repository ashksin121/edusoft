import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    userId: "",
    coins: 0,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = profileSlice.actions;

export default profileSlice.reducer;
