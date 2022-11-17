
import { createSlice } from '@reduxjs/toolkit'
import {despesa} from '../interface/despesa'
import { RootState } from '../store'
// Define a type for the slice state
interface GeralState {
    despesas: despesa[],
    aplicarFiltro: boolean,
    despesasExibidas: despesa[],
    periodoFinal: Date,
    periodoInicial: Date,
    valor: number,
    metodoDePagamento: string,
    moeda: string,
    tag: string,
    descricao: string,
    valorTotal: number,
    valorDolar: number,
    atualizaValorDolar: boolean,
    dataAtualDoFiltro: Date,
    dataDaDespesa: Date,
}

export const initialState: GeralState = {
    despesas: [],
    aplicarFiltro: false,
    despesasExibidas: [],
    periodoFinal: new Date(),
    periodoInicial: new Date(),
    valor: 0,
    metodoDePagamento: '',
    moeda: '',
    tag: '',
    descricao: '',
    valorTotal: 0,
    valorDolar: 0,
    atualizaValorDolar: false,
    dataAtualDoFiltro: new Date(),
    dataDaDespesa: new Date(),
}

export const geralSlice = createSlice({
    name: 'geral',
    initialState,
    reducers: {
        editaDespesas: (state, action) => {
            state.despesas = action.payload
        },
        editaAplicarFiltro: (state, action) => {
            state.aplicarFiltro = action.payload
        },
        editaDespesasExibidas: (state, action) => {
            state.despesasExibidas = action.payload
        },
        editaPeriodoFinal: (state, action) => {
            const novoPeriodoFinal = new Date(action.payload)
            state.periodoFinal = novoPeriodoFinal
        },
        editaPeriodoInicial: (state, action) => {
            const novoPeriodoInicial = new Date(action.payload)
            state.periodoInicial = novoPeriodoInicial
        },
        editaValor: (state, action) => {
            state.valor = action.payload
        },
        editaMetodoDePagamento: (state, action) => {
            state.metodoDePagamento = action.payload
        },
        editaMoeda: (state, action) => {
            state.moeda = action.payload
        },
        editaTag: (state, action) => {
            state.tag = action.payload
        },
        editaDescricao: (state, action) => {
            state.descricao = action.payload
        },
        editaValorTotal: (state, action) => {
            state.valorTotal = action.payload
        },
        editaValorDolar: (state, action) => {
            state.valorDolar = action.payload
        },
        editaAtualizaValorDolar: (state, action) => {
            state.atualizaValorDolar = action.payload
        },
        editaDataAtualDoFiltro: (state, action) => {
            const novaDataAtualDoFiltro = new Date(action.payload)
            state.dataAtualDoFiltro = novaDataAtualDoFiltro
        },
        editaDataDaDespesa: (state, action) => {
            const novaDataDaDespesa = new Date(action.payload)
            state.dataDaDespesa = novaDataDaDespesa
        },
    },
})

export const { editaDespesas, editaAplicarFiltro, editaDespesasExibidas, editaPeriodoFinal, editaPeriodoInicial, editaValor, editaMetodoDePagamento, editaMoeda, editaTag, editaDescricao, editaValorTotal, editaValorDolar, editaAtualizaValorDolar, editaDataAtualDoFiltro, editaDataDaDespesa } = geralSlice.actions

export const selectDespesas = (state: RootState) => state.geral.despesas
export const selectAplicarFiltro = (state: RootState) => state.geral.aplicarFiltro
export const selectDespesasExibidas = (state: RootState) => state.geral.despesasExibidas
export const selectPeriodoFinal = (state: RootState) => state.geral.periodoFinal
export const selectPeriodoInicial = (state: RootState) => state.geral.periodoInicial
export const selectValor = (state: RootState) => state.geral.valor
export const selectMetodoDePagamento = (state: RootState) => state.geral.metodoDePagamento
export const selectMoeda = (state: RootState) => state.geral.moeda
export const selectTag = (state: RootState) => state.geral.tag
export const selectDescricao = (state: RootState) => state.geral.descricao
export const selectValorTotal = (state: RootState) => state.geral.valorTotal
export const selectValorDolar = (state: RootState) => state.geral.valorDolar
export const selectAtualizaValorDolar = (state: RootState) => state.geral.atualizaValorDolar
export const selectDataAtualDoFiltro = (state: RootState) => state.geral.dataAtualDoFiltro
export const selectDataDaDespesa = (state: RootState) => state.geral.dataDaDespesa

export default geralSlice.reducer


