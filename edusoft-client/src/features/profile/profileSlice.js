import { doc, getDoc, setDoc } from "@firebase/firestore";
import { createSlice } from "@reduxjs/toolkit";
import { getAuth, signOut } from "firebase/auth";

import { db } from "../../firebase";

const initialState = {
    name: "",
    email: "",
    userId: "",
    coins: 0,
    sessionsBooked: [],
    isLoading: false,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.userId = action.payload.userId;
            state.coins = action.payload.coins;
            state.sessionsBooked = action.payload.sessionsBooked;
        },
        resetProfile: (state) => {
            state.name = "";
            state.email = "";
            state.userId = "";
            state.coins = 0;
            state.sessionsBooked = [];
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { resetProfile, setIsLoading, setProfile } = profileSlice.actions;

export default profileSlice.reducer;

export const signUp = (userData) => {
    return async (dispatch) => {
        await setDoc(doc(db, "users", userData.user.uid), {
            name: userData.name,
            email: userData.user.email,
            coins: +0,
            userId: userData.user.uid,
            completedCourses: [],
            pendingCourses: [],
            uploadedCourses: [],
            answersMap: {},
            sessionsBooked: [],
        });
        localStorage.setItem("userId", userData.user.uid);
        dispatch(
            setProfile({
                name: userData.name,
                email: userData.user.email,
                coins: +0,
                userId: userData.user.uid,
                sessionsBooked: [],
            })
        );
    };
};

export const logIn = (userId) => {
    return async (dispatch) => {
        dispatch(setIsLoading(true));
        console.log(userId);
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            console.log(userData);
            localStorage.setItem("userId", userId);
            dispatch(
                setProfile({
                    name: userData.name,
                    email: userData.email,
                    coins: userData.coins,
                    userId: userData.userId,
                    sessionsBooked: userData.sessionsBooked,
                })
            );
            dispatch(setIsLoading(false));
        } else {
            throw new Error("Data not found");
        }
    };
};

export const logOut = () => {
    return (dispatch) => {
        try {
            const auth = getAuth();
            signOut(auth).then(async () => {
                localStorage.removeItem("userId");
                dispatch(resetProfile());
            });
        } catch (err) {
            throw err;
        }
    };
};
