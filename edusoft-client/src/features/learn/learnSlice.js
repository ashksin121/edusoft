import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allCourses: [],
    pendingCourses: [],
    completedCoures: [],
};

export const learnSlice = createSlice({
    name: "learn",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = learnSlice.actions;

export default learnSlice.reducer;
