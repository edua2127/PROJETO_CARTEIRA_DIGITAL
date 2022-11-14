import { configureStore } from '@reduxjs/toolkit'
import despesasReducer from './slice/despesaSlice'

//aqui fica os meus reducers de todoas os states
export const store = configureStore({
  reducer: {
    despesa: despesasReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch