import { collection, getDocs, query, where } from "@firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";

var cloneDeep = require("lodash.clonedeep");

const initialState = {
    uploadedCourses: [],
    acceptedCourses: [],
    rejectedCourses: [],
    acceptedCourseIds: [],
    rejectedCourseIds: [],
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
            state.acceptedCourseIds = action.payload.acceptedCourseIds;
            state.rejectedCourseIds = action.payload.rejectedCourseIds;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setTeachData } = teachSlice.actions;

export default teachSlice.reducer;

// Fetches data related to teach section
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
        let acceptedCourseIds = [];
        let rejectedCourseIds = [];
        querySnapshot.forEach((doc) => {
            let courseData = doc.data();
            courseData.courseId = doc.id;
            if (courseData.status === "REJECTED") {
                rejectedCourses.push(courseData);
                rejectedCourseIds.push(doc.id);
            } else if (courseData.status === "ACCEPTED") {
                acceptedCourses.push(courseData);
                acceptedCourseIds.push(doc.id);
            }
            uploadedCourses.push(courseData);
        });
        dispatch(
            setTeachData({
                uploadedCourses: uploadedCourses,
                acceptedCourses: acceptedCourses,
                rejectedCourses: rejectedCourses,
                acceptedCourseIds: acceptedCourseIds,
                rejectedCourseIds: rejectedCourseIds,
            })
        );
        dispatch(setIsLoading(false));
    };
};
