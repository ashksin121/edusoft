import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";

import { db } from "../../firebase";

const initialState = {
    allCourses: [],
    pendingCourses: [],
    completedCourses: [],
    pendingCoursesIds: [],
    completedCoursesIds: [],
    answersMap: {},
    isLoading: false,
};

export const learnSlice = createSlice({
    name: "learn",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLearnData: (state, action) => {
            state.allCourses = action.payload.allCourses;
            state.pendingCourses = action.payload.pendingCourses;
            state.completedCourses = action.payload.completedCourses;
            state.completedCoursesIds = action.payload.completedCoursesIds;
            state.pendingCoursesIds = action.payload.pendingCoursesIds;
            state.answersMap = action.payload.answersMap;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setIsLoading, setLearnData } = learnSlice.actions;

export default learnSlice.reducer;

// fetches all data related to Learn section
export const getLearningData = (userId) => {
    return async (dispatch, getState) => {
        dispatch(setIsLoading(true));
        if (userId !== "") {
            const querySnapshot = await getDocs(collection(db, "courses"));
            let courses = [];
            querySnapshot.forEach((doc) => {
                let courseData = doc.data();
                courseData.courseId = doc.id;
                courses.push(courseData);
            });
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            const userData = docSnap.data();
            let allCourses = [];
            let completedCourses = [];
            let pendingCourses = [];
            courses.forEach((course) => {
                if (userData.completedCourses.includes(course.courseId)) {
                    completedCourses.push(course);
                } else if (userData.pendingCourses.includes(course.courseId)) {
                    pendingCourses.push(course);
                }
                if (
                    course.instructorId !== userId &&
                    course.status === "ACCEPTED"
                ) {
                    allCourses.push(course);
                }
            });
            dispatch(
                setLearnData({
                    allCourses,
                    completedCourses,
                    pendingCourses,
                    completedCoursesIds: userData.completedCourses,
                    pendingCoursesIds: userData.pendingCourses,
                    answersMap: userData.answersMap,
                })
            );
            dispatch(setIsLoading(false));
        }
    };
};
