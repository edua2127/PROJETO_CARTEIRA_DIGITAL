import { createSlice } from '@reduxjs/toolkit'

const dateType = new Date()
export const slice = createSlice({
    name: 'periodoInicialSlice',
    initialState: {
        periodoInicial: dateType,
    },
    reducers: {
        editaPeriodoInicial(state, action) {
            const novoState = {...state, periodoInicial: action.payload}
            return novoState
        },
      
    }
})

export const {editaPeriodoInicial} = slice.actions

export const selectPeriodoInicial = state => state.periodoInicial
export default slice.reducer