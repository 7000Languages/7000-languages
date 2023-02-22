/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { I18n } from 'i18n-js'
import en from '../../utils/i18n/translations/en'
import fr from '../../utils/i18n/translations/fr'
import es from '../../utils/i18n/translations/es'

const i18n = new I18n({ en, fr, es })

const initialState = {
  i18n,
}

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    changeAppLocale: (state, { payload }) => {
      const newI18n = new I18n()
      newI18n.locale = payload
      newI18n.enableFallback = true
      newI18n.translations = { en, fr, es }

      state.i18n = newI18n
    },
  },
})

export const { action } = localeSlice
export const { changeAppLocale } = localeSlice.actions
export default localeSlice.reducer
