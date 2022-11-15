import { createSlice } from '@reduxjs/toolkit'

const dateType = new Date()
export const slice = createSlice({
    name: 'periodoFinalSlice',
    initialState: {
        periodoFinal: dateType,
    },
    reducers: {
        editaPeriodoFinal(state, action) {
            const novoState = {...state, periodoFinal: action.payload}
            return novoState
        },
      
    }
})

export const {editaPeriodoFinal} = slice.actions

export const selectPeriodoFinal = state => state.periodoFinal
export default slice.reducer