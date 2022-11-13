import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import style from '../styles/home.module.css'
import {adicionaDespesa } from '../slice/despesaSlice'
import type {RootState} from '../store'

const Home = () => {
    const [valor, setValor] = React.useState(0);
    const [metodoDePagamento, setMetodoDePagamento] = React.useState("");
    const [moeda, setMoeda] = React.useState("")
    const [tag, setTag] = React.useState("")
    const [descricao, setDescricao] = React.useState("")
    let teste:despesa[] = []
    let testeDate: Date = new Date(Date.now())
    const [valorTotal, setValorTotal] = React.useState(0)
    const [data, setData] = React.useState(testeDate)
    const [despesasExibidas, setDespesasExibidas] = React.useState(teste)
    const [valorDolar, setValorDolar] = React.useState(1)
    const [atualizaValorDolar, setAtualizaValorDolar] = React.useState(false)

    //usado para acessar os reduces que alteram os states
    const dispatch = useDispatch()
    //acessa o state de despesas
    const despesasRedux = useSelector((state:RootState)=> state.despesa.despesas)

    interface despesa  {
        valor: number,
        metodoDePagamento: string,
        moeda: string,
        tag: string,
        descricao: string,
        data: Date
    }

    function exibirNovasDespesas(novasDespesas: despesa[]) {
        setDespesasExibidas(novasDespesas)
    }

    React.useEffect(() => {
        const fetchData = async() => {
            try {
                const res = await fetch('https://economia.awesomeapi.com.br/json/all')
                const json = await res.json()
                setValorDolar(parseFloat(json.USD.bid))
            } catch (error) {
                console.log('erro ao carregar o valor do dolar ' + error)
            }
            
        }
        fetchData()
    }, [atualizaValorDolar])

    function calculoDoValorTotal(novasDespesas: despesa[]) {

        setValorTotal((state)=> 0)
        novasDespesas.map((despesaAtual) => {
            if (despesaAtual.moeda === 'DOLAR') {
                let valorConvertido = despesaAtual.valor * valorDolar
                setValorTotal((valorAntigo) => valorAntigo + valorConvertido)
            } else if (despesaAtual.moeda === 'BRL') {
                setValorTotal((valorAntigo) => valorAntigo + despesaAtual.valor)
            }
        })
    }

    function cadastrarDespesa() {

        const novaDespesa = {
            valor,
            metodoDePagamento,
            moeda,
            tag,
            descricao,
            data,
        }

        setValor(0)
        setDescricao("")
        setMoeda("")
        setTag("")
        setMetodoDePagamento("")

        dispatch(adicionaDespesa(novaDespesa))

        setAtualizaValorDolar(true)
        exibirNovasDespesas([...despesasRedux, novaDespesa])
        calculoDoValorTotal([...despesasRedux, novaDespesa])
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
                               value={valor}
                               onChange={(e)=> setValor(parseFloat(e.target.value))}/>
                        <select className={style.home_input}
                                placeholder={"Moeda"}
                                value={moeda}
                                onChange={(e)=> setMoeda(e.target.value)}>
                            <option value="BRL">BRL</option>
                            <option value="DOLAR">DOLAR</option>
                        </select>
                        <select className={style.home_input}
                                placeholder={"Metodo de Pagamento"}
                                value={metodoDePagamento}
                                onChange={(e)=> setMetodoDePagamento(e.target.value)}>
                            <option value="DINHEIRO">Dinheiro</option>
                            <option value="CARTÃO DE DÉBITO">Cartão de débito</option>
                            <option value="CARTÃO DE CRÉDITO">Cartão de crédito</option>
                        </select>
                        <select className={style.home_input} placeholder={"Tag"}
                                value={tag} onChange={(e)=> setTag(e.target.value)}>
                            <option value="ALIMENTAÇÃO">Alimentação</option>
                            <option value="LAZER">Lazer</option>
                            <option value="TRABALHO">Trabalho</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="SAÚDE">Saúde</option>
                        </select>
                        <input type="date" className={style.home_input} placeholder={"data da despesa"}
                               value={data.toString()}
                               onChange={(e)=> setData(new Date(e.target.value))}
                        /> 
                    </article>
                    <article className={style.home_article}>
                        <input type={"text"} className={style.home_input_descricao} placeholder={"Descrição"}
                               value={descricao} onChange={(e)=>setDescricao(e.target.value)}/>
                        <input type={"submit"} className={style.home_input} onClick={cadastrarDespesa}/>
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
                            <tbody>

                            {despesasRedux.length > 0 && despesasExibidas.map((item:despesa, index:number) =>
                                (
                                    <tr key={index}>
                                        <td>{item.valor}</td>
                                        <td>{item.moeda}</td>
                                        <td> {item.data.getMonth()} / {item.data.getFullYear()} </td>
                                        <td>{item.metodoDePagamento}</td>
                                        <td>{item.tag}</td>
                                        <td>{item.descricao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </article>
                </section>
                <section className={style.home_end_page}>
                    <article className={style.home_article_edicao_data}>
                        <button className={style.home_button}>Editar Periodo</button>
                    </article>
                    <article>
                        <h1 className={style.home_texto_data}>R$ {valorTotal}</h1>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default Home

