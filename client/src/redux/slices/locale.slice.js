import { createSlice } from '@reduxjs/toolkit'
import { I18n } from 'i18n-js'
import en from '../../utils/i18n/translations/en'
import fr from '../../utils/i18n/translations/fr'
import es from '../../utils/i18n/translations/es'

const i18n = new I18n({ en, fr, es })

const initialState = {
    i18n
}

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeAppLocale: (state, { payload }) => {
        state.i18n.locale = payload
        state.enableFallback = true
        state.translations = { en, fr, es }
    },
  },
})

export const { action } = localeSlice
export const { changeAppLocale } = localeSlice.actions
export default localeSlice.reducer