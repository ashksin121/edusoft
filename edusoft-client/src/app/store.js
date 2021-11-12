import { configureStore } from "@reduxjs/toolkit";

import learnReducer from "../features/learn/learnSlice";
import profileReducer from "../features/profile/profileSlice";
import teachReducer from "../features/teach/teachSlice";

export const store = configureStore({
    reducer: {
        learn: learnReducer,
        profile: profileReducer,
        teach: teachReducer,
    },
});
