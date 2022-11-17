import { configureStore } from '@reduxjs/toolkit'
import geralSlice from './slice/geralSlice2'

//aqui fica os meus reducers de todoas os states
export const store = configureStore({
  reducer: {
    geral: geralSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch