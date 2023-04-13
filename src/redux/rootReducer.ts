import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";
import coursesSlice from "./slices/coursesSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    connection: connectionSlice,
    courses: coursesSlice
});

export default rootReducer;