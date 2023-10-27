import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface unitsState {
    downloadedUnits: { downloadedDate: Date, _id: string }[]
}

const initialState: unitsState = {
    downloadedUnits: []
}

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setDownloadedUnits: (state, action: PayloadAction<{ downloadedDate: Date, _id: string }[]>) => {
        let units = [...action.payload]
        state.downloadedUnits = units
    },
  },
});

export const { setDownloadedUnits } = unitsSlice.actions

export default unitsSlice.reducer
