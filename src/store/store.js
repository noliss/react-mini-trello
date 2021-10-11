import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  initialState: {
	  value: 0
  },
  reducer: {},
})