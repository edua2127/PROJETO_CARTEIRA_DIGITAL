import React from 'react'
import {useDispatch, useSelector} from 'react-redux';
import style from '../styles/home.module.css'
import type {RootState} from '../store'
import {despesa} from '../interface/despesa';
import {
    editaAplicarFiltro,
    editaAtualizaValorDolar,
    editaDataAtualDoFiltro,
    editaDataDaDespesa,
    editaDescricao,
    editaDespesas,
    editaDespesasExibidas,
    editaMetodoDePagamento,
    editaMoeda,
    editaTag,
    editaValor,
    editaValorDolar,
    editaValorTotal
} from '../slice/geralSlice2';
import EditorPeriodo from '../components/EditorPeriodo';

const Home = () => {
    //variaveis usadas para setar um valor inicial
    let teste:despesa[] = []
    let DateType: Date = new Date(Date.now())

    const dispatch = useDispatch()
    
    const stateGeral = useSelector((state:RootState) => state)

    function aumentarMesAtual() {
        const novaData = new Date(stateGeral.geral.dataAtualDoFiltro.getFullYear(), 
        stateGeral.geral.dataAtualDoFiltro.getMonth() + 1, stateGeral.geral.dataAtualDoFiltro.getDay())
        dispatch(editaDataAtualDoFiltro(novaData))
        console.log(novaData.getMonth() + 1)
        
    }

    function diminuirMesAtual() {
        const novaData = new Date(stateGeral.geral.dataAtualDoFiltro.getFullYear(), 
        stateGeral.geral.dataAtualDoFiltro.getMonth() - 1, stateGeral.geral.dataAtualDoFiltro.getDay())
        dispatch(editaDataAtualDoFiltro(novaData))
        console.log(novaData.getMonth() + 1)
    }

    function filtroPelaDataAtual() {
        let novaDespesasExibidas:despesa[] = [...stateGeral.geral.despesas]
        novaDespesasExibidas = novaDespesasExibidas.filter((despesaAtual) => {
            let dataDaDespesaAtual = new Date(despesaAtual.data)
            dataDaDespesaAtual.setDate(dataDaDespesaAtual.getDate() + 1)
            const dataAtualDoFiltro = new Date(stateGeral.geral.dataAtualDoFiltro)

            return dataDaDespesaAtual.getMonth() === dataAtualDoFiltro.getMonth()
                && dataDaDespesaAtual.getFullYear() === dataAtualDoFiltro.getFullYear()
        })
        console.log(stateGeral.geral.dataAtualDoFiltro.getMonth() + 1)
        console.log(novaDespesasExibidas)
        dispatch(editaDespesasExibidas(novaDespesasExibidas))
    }


    React.useEffect(()=> {
        filtroPelaDataAtual()
    }, [stateGeral.geral.dataAtualDoFiltro])

    //função que atualiza o valor do dolar
    const atualizaValorDolaApi = async() => {
        try {
            const res = await fetch('https://economia.awesomeapi.com.br/json/all')
            const json = await res.json()
            dispatch(editaValorDolar(parseFloat(json.USD.bid)))
        } catch (error) {
            console.log('erro ao carregar o valor do dolar ' + error)
        }
    }


    React.useEffect(() => {
        atualizaValorDolaApi()
    }, [stateGeral.geral.atualizaValorDolar])

    /* 
        função que calcula o valor total das despesas, verifica se a moeda é dolar e se sim multiplica pelo valor do dolar atual
    */
    React.useEffect(()=> {
        function calculoDoValorTotal() {
            const despesaExibidasLocal: despesa[] = stateGeral.geral.despesasExibidas
            let valorTotalAtual = 0
            despesaExibidasLocal.map((despesaAtual) => {
                let valorEmReal = parseFloat(despesaAtual.valor.toString())
                
                if (despesaAtual.moeda === 'DOLAR') {
                    valorEmReal = despesaAtual.valor * stateGeral.geral.valorDolar
                    console.log('valor em real depois que foi convertido de dolar: ' + valorEmReal)
                }
                valorTotalAtual += valorEmReal
                console.log(valorTotalAtual)
            })
            dispatch(editaValorTotal(valorTotalAtual.toFixed(2)))
        }
        calculoDoValorTotal()
    }, [stateGeral.geral.despesasExibidas])
    
    /* 
        funcão que adiciona uma nova despesa ao array de despesas
    */
    function cadastrarDespesa() {

        //cria um novo objeto despesa
        const novaDespesa: despesa = criaUmaDespesaComOsDadosDoEditor()

        //limpa os states que compoem a despesa
        limpaOsCamposDeDespesa()

        //guarda a nova despesa no redux state
        dispatch(editaDespesas([...stateGeral.geral.despesas, novaDespesa]))

        //atualiza o valor do dolar para calcular o valor total das despesas
        atualizaValorDolar()
    }

    function atualizaValorDolar() {
        dispatch(editaAtualizaValorDolar(true))
    }

    React.useEffect(()=> {
        atualizaAsDespesasExibidas()
    }, [stateGeral.geral.despesas])

    function atualizaAsDespesasExibidas() {
        dispatch(editaDespesasExibidas(stateGeral.geral.despesas))
    }

    function criaUmaDespesaComOsDadosDoEditor(): despesa {
        return {
            valor: stateGeral.geral.valor,
            metodoDePagamento: stateGeral.geral.metodoDePagamento,
            moeda: stateGeral.geral.moeda,
            tag: stateGeral.geral.tag,
            descricao: stateGeral.geral.descricao,
            data: stateGeral.geral.dataDaDespesa,
        }
    }

    function limpaOsCamposDeDespesa() {
        dispatch(editaValor(0))
        dispatch(editaDescricao(""))
        dispatch(editaMoeda(""))
        dispatch(editaTag(""))
        dispatch(editaDataDaDespesa(DateType))
        dispatch(editaMetodoDePagamento(""))
    }

    /*
        funcão que sinaliza quando o componente EditorPeriodo deve ser renderizado
    */
    function handleChangeAplicarFiltro() {
        dispatch(editaAplicarFiltro(true))
    }

    return (
        <div>
            <header>
                <h1 className={style.home_logo}>Walle</h1>
            </header>
            <main>
                <section className={style.home_section}>
                    <article className={style.home_article}>
                        <input type="number" className={style.home_input} placeholder={"Valor"}
                               value={stateGeral.geral.valor}
                               onChange={(e)=> dispatch(editaValor(e.target.value))}/>
                        <select className={style.home_input}
                                placeholder={"Moeda"}
                                value={stateGeral.geral.moeda}
                                onChange={(e)=> dispatch(editaMoeda(e.target.value))}>
    
                            <option value="BRL">REAL</option>
                            <option value="DOLAR">DOLAR</option>
                        </select>
                        <select className={style.home_input}
                                placeholder={"Metodo de Pagamento"}
                                value={stateGeral.geral.metodoDePagamento}
                                onChange={(e)=> dispatch(editaMetodoDePagamento(e.target.value))}>
                            <option value="DINHEIRO">Dinheiro</option>
                            <option value="CARTÃO DE DÉBITO">Cartão de débito</option>
                            <option value="CARTÃO DE CRÉDITO">Cartão de crédito</option>
                        </select>
                        <select className={style.home_input} placeholder={"Tag"}
                                value={stateGeral.geral.tag} onChange={(e)=> dispatch(editaTag(e.target.value))}>
                            <option value="ALIMENTAÇÃO">Alimentação</option>
                            <option value="LAZER">Lazer</option>
                            <option value="TRABALHO">Trabalho</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="SAÚDE">Saúde</option>
                        </select>
                        <input type="date" className={style.home_input} placeholder={"data da despesa"}
                                value={stateGeral.geral.dataDaDespesa.toString()}
                                onChange={(e)=> dispatch(editaDataDaDespesa(e.target.value))}/>
                        
                    </article>
                    <article className={style.home_article}>
                        <input type={"text"} className={style.home_input_descricao} placeholder={"Descrição"}
                            value={stateGeral.geral.descricao}
                            onChange={(e)=> dispatch(editaDescricao(e.target.value))}/>
                        <input type={"submit"} className={style.home_input} onClick={cadastrarDespesa} value={"+ adicionar"}/>
                    </article>
                </section>
                <section className={style.home_section}>
                    <article>
                        <table className={style.home_table}>
                            <thead>
                            <tr>
                                <th className={style.home_table_td_th}>Valor</th>
                                <th className={style.home_table_td_th}>Moeda</th>
                                <th className={style.home_table_td_th}>Data da Despesa</th>
                                <th className={style.home_table_td_th}>Metodo de Pagamento</th>
                                <th className={style.home_table_td_th}>Tag</th>
                                <th className={style.home_table_td_th}>Descricao</th>
                            </tr>
                            </thead>
                            <tbody className={style.home_table_body}>

                            {stateGeral.geral.despesas.length > 0 && stateGeral.geral.despesasExibidas.map((item:despesa, index:number) => {
                                let data = new Date(item.data.getFullYear(), item.data.getMonth(), item.data.getDate())
                                data.setDate(data.getDate() + 1)
                                const dataFormatada = '' + data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear()
                                return (
                                    <tr key={index} className={style.home_table_tr}>
                                        <td>{item.valor}</td>
                                        <td>{item.moeda}</td>
                                        <td>{dataFormatada} </td>
                                        <td>{item.metodoDePagamento}</td>
                                        <td>{item.tag}</td>
                                        <td>{item.descricao}</td>
                                    </tr>)} ) }
                                   
                            </tbody>
                        </table>
                    </article>
                </section>
                <section className={style.home_end_page}>
                    <article className={style.home_article_edicao_data}>
                        <button className={style.home_button} onClick={diminuirMesAtual}>mês anterior</button>

                        <h1 className={style.home_texto_data}>{stateGeral.geral.dataAtualDoFiltro.getMonth() + 1} / 
                        {stateGeral.geral.dataAtualDoFiltro.getFullYear()}</h1>
                        <button onClick={aumentarMesAtual} className={style.home_button}>próximo mês</button>
                        <button onClick={handleChangeAplicarFiltro}  className={style.home_button}>editar período</button>
                    </article>
                    <article>
                        <h1 className={style.home_texto_data}>R$ {stateGeral.geral.valorTotal}</h1>
                    </article>
                </section>
                {stateGeral.geral.aplicarFiltro && <EditorPeriodo />}
            </main>
        </div>
    )
}

export default Home

