import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    uploadedCourses: [],
    acceptedCourses: [],
    rejectedCourses: [],
};

export const teachSlice = createSlice({
    name: "teach",
    initialState,
    reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = teachSlice.actions;

export default teachSlice.reducer;
