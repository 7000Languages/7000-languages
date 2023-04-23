import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";
import coursesSlice from "./slices/coursesSlice";
import localeSlice from "./slices/localeSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    connection: connectionSlice,
    courses: coursesSlice,
    locale: localeSlice
});

export default rootReducer;