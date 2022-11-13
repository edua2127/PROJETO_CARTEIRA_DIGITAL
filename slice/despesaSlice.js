import { createSlice, PayloadAction } from '@reduxjs/toolkit'


//com o criete slice na é necessario o type da action
//slice: reducer + state
//initialState: states do slice
//reducers: funcoes que alterao o state, elas retornam o novo valor do initialState!

export const slice = createSlice({
    name: 'despesaSlice',
    initialState: {
        despesas: [],
    },
    reducers: {
        adicionaDespesa(state, action) {
            const novoState = {...state, despesas: [...state.despesas, action.payload]}
            return novoState
        },
      
    }
})

//desestrutura o action pegando os reducers para poderem serem exportados
export const {adicionaDespesa} = slice.actions

//exporta os states
export const selectDespesas = state => state.despesas
export default slice.reducer