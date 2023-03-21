import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConnectionState{
    isOnline: boolean;
}
const initialState: ConnectionState = {
    isOnline: false,
}

const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        toggleConnection: (state, action:PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        }
    }
});

export const { toggleConnection } = connectionSlice.actions

export default connectionSlice.reducer