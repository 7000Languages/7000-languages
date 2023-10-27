import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";
import coursesSlice from "./slices/coursesSlice";
import localeSlice from "./slices/localeSlice";
import unitsSlice from "./slices/unitsSlice";
import lessonsSlice from "./slices/lessonsSlice";
import vocabsSlice from "./slices/vocabsSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    connection: connectionSlice,
    courses: coursesSlice,
    locale: localeSlice,
    units: unitsSlice,
    lessons: lessonsSlice,
    vocabs: vocabsSlice
});

export default rootReducer;