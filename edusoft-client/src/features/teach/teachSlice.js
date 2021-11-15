import { collection, getDocs, query, where } from "@firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";

var cloneDeep = require("lodash.clonedeep");

const initialState = {
    uploadedCourses: [],
    acceptedCourses: [],
    rejectedCourses: [],
    isLoading: false,
};

export const teachSlice = createSlice({
    name: "teach",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setTeachData: (state, action) => {
            state.uploadedCourses = cloneDeep(action.payload.uploadedCourses);
            state.acceptedCourses = cloneDeep(action.payload.acceptedCourses);
            state.rejectedCourses = cloneDeep(action.payload.rejectedCourses);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setTeachData } = teachSlice.actions;

export default teachSlice.reducer;

export const getTeachingData = (userId) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));
        const q = query(
            collection(db, "courses"),
            where("instructorId", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        let uploadedCourses = [];
        let acceptedCourses = [];
        let rejectedCourses = [];
        querySnapshot.forEach((doc) => {
            let courseData = doc.data();
            courseData.courseId = doc.id;
            if (courseData.status === "REVIEW") {
                uploadedCourses.push(courseData);
            } else if (courseData.status === "ACCEPTED") {
                acceptedCourses.push(courseData);
            } else {
                rejectedCourses.push(courseData);
            }
        });
        dispatch(
            setTeachData({
                uploadedCourses: uploadedCourses,
                acceptedCourses: acceptedCourses,
                rejectedCourses: rejectedCourses,
            })
        );
        dispatch(setIsLoading(false));
    };
};
