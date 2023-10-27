import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface vocabsState {
    downloadedVocabs: { downloadedDate: Date, _id: string }[]
}

const initialState: vocabsState = {
    downloadedVocabs: []
}

const vocabsSlice = createSlice({
  name: 'vocabs',
  initialState,
  reducers: {
    setDownloadedVocabs: (state, action: PayloadAction<{ downloadedDate: Date, _id: string }[]>) => {
        let vocabs = [...action.payload]
        state.downloadedVocabs = vocabs
    },
  },
});

export const { setDownloadedVocabs } = vocabsSlice.actions

export default vocabsSlice.reducer
