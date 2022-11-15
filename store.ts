import { configureStore } from '@reduxjs/toolkit'
import despesasReducer from './slice/despesaSlice'
import aplicarFiltroReducer from './slice/aplicarFiltroSlice'
import despesasExibidasReducer from './slice/despesasExibidasSlice'
import periodoFinalReducer from './slice/periodoFinalSlice'
import periodoInicialReducer from './slice/periodoInicialSlice'

//aqui fica os meus reducers de todoas os states
export const store = configureStore({
  reducer: {
    despesa: despesasReducer,
    aplicarFiltro: aplicarFiltroReducer,
    despesasExibidas: despesasExibidasReducer,
    periodoFinal: periodoFinalReducer,
    periodoInicial: periodoInicialReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch