import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface lessonsState {
    downloadedLessons: { downloadedDate: Date, _id: string }[]
}

const initialState: lessonsState = {
    downloadedLessons: []
}

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    setDownloadedLessons: (state, action: PayloadAction<{ downloadedDate: Date, _id: string }[]>) => {
        let lessons = [...action.payload]
        state.downloadedLessons = lessons
    },
  },
});

export const { setDownloadedLessons } = lessonsSlice.actions

export default lessonsSlice.reducer
