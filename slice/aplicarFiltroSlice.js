import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'AplicarFiltroSlice',
    initialState: {
        aplicarFiltro: false,
    },
    reducers: {
        editaAplicarFiltro(state, action) {
            const novoState = {...state, aplicarFiltro: action.payload}
            return novoState
        },
      
    }
})

export const {editaAplicarFiltro} = slice.actions

export const selectAplicarFiltro = state => state.aplicarFiltro
export default slice.reducer