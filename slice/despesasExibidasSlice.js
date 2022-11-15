import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'despesasExibidasSlice',
    initialState: {
        despesasExibidas: [],
    },
    reducers: {
        editaDespesasExibidas(state, action) {
            const novoState = {...state, despesasExibidas: action.payload}
            return novoState
        },
      
    }
})

export const {editaDespesasExibidas} = slice.actions

export const selectDespesasExibidas = state => state.despesasExibidas
export default slice.reducer