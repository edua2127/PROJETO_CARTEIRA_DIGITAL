import React from 'react'
import style from '../components/EditarPeriodo.module.css'
import { useDispatch, useSelector } from 'react-redux';
import type {RootState} from '../store'
import { editaPeriodoInicial } from '../slice/periodoInicialSlice';
import { editaPeriodoFinal } from '../slice/periodoFinalSlice';
import { editaAplicarFiltro } from '../slice/aplicarFiltroSlice';
import {despesa} from '../interface/despesa'
import { editaDespesasExibidas } from '../slice/despesasExibidasSlice';
const EditorPeriodo = () => {
  const dispatch = useDispatch()
  const stateGeral = useSelector((state:RootState) => state)

  function handleAplicarFiltro() {
    dispatch(editaAplicarFiltro(false))
    let filtroDespesasExibidas:despesa[] = [...stateGeral.despesa.despesas]
    filtroDespesasExibidas = filtroDespesasExibidas.filter((despesaAtual) => {
      
      const dataDaDespesa: number = despesaAtual.data.getTime()
      const dataDoPeriodoInicial: number = new Date(stateGeral.periodoInicial.periodoInicial).getTime()
      const dataDoPeriodoFinal: number = new Date(stateGeral.periodoFinal.periodoFinal).getTime()

      const condicao1:Boolean = dataDaDespesa >= dataDoPeriodoInicial
      const condicao2:Boolean =  dataDaDespesa <= dataDoPeriodoFinal

      console.log(despesaAtual.data)
      return condicao1 && condicao2
    })
    dispatch(editaDespesasExibidas(filtroDespesasExibidas))
  }
  return (
      <section className={style.home_end_page}>
        <article className={style.home_article_edicao_data}>
          <label>
            <span className={style.home_texto_data}>Periodo Inicial</span>
            <input  type={"date"} className={style.home_input} 
            value={stateGeral.periodoInicial.periodoInicial.toString()} onChange={(e)=> dispatch(editaPeriodoInicial(e.target.value))}/>
          </label>
          <label>
            <span className={style.home_texto_data}>Periodo Final</span>
            <input  type={"date"} className={style.home_input}
            value={stateGeral.periodoFinal.periodoFinal.toString()} onChange={(e)=> dispatch(editaPeriodoFinal(e.target.value))}/>
          </label>
          <input type={"submit"} className={style.home_input} onClick={handleAplicarFiltro}/>
        </article>
      </section>
  )
}

export default EditorPeriodo