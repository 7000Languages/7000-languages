import { combineReducers } from "redux";
import authSlice from "./slices/authSlice";
import connectionSlice from "./slices/connectionSlice";

const rootReducer = combineReducers({
    auth: authSlice,
    connection: connectionSlice
});

export default rootReducer;