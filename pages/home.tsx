import React from 'react'
import style from '../styles/home.module.css'
import {somaValorTotal} from "../utils/calculoDoValorTotalDasDespesas"
const Home = () => {
    const [valor, setValor] = React.useState(0);
    const [metodoDePagamento, setMetodoDePagamento] = React.useState("");
    const [moeda, setMoeda] = React.useState("")
    const [tag, setTag] = React.useState("")
    const [descricao, setDescricao] = React.useState("")
    let teste:despesa[] = []
    let testeDate: Date = new Date(2022, 11, 12)

    const [despesas, setDespesas] = React.useState(teste)
    const [valorTotal, setValorTotal] = React.useState(0)
    const [data, setData] = React.useState(testeDate)

    interface despesa  {
        valor: number,
        metodoDePagamento: string,
        moeda: string,
        tag: string,
        descricao: string,
        data: Date
    }
    function cadastrarDespesa() {

        let novaDespesa = {
            valor,
            metodoDePagamento,
            moeda,
            tag,
            descricao,
            data,
        }

        let teste = [...despesas, novaDespesa]
        setDespesas(teste)

        setValorTotal(somaValorTotal(valorTotal, valor))

        setValor(0)
        setDescricao("")
        setMoeda("")
        setTag("")
        setMetodoDePagamento("")
        console.log(despesas)
    }
    return (
        <div>
            <header>
                <h1 className={style.home_logo}>Walle</h1>
            </header>
            <main>
                <h1>teste</h1>
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
                            <option value="DINHEIRO FISICO">Dinheiro Fisico</option>
                            <option value="DEBITO OU PIX">Debito ou Pix</option>
                            <option value="CREDITO">Credito</option>
                        </select>
                        <select className={style.home_input} placeholder={"Tag"}
                                value={tag} onChange={(e)=> setTag(e.target.value)}>
                            <option value="ALIMENTAÇÃO">Alimentação</option>
                            <option value="AGUA">Agua</option>
                            <option value="LUZ">Luz</option>
                            <option value="TELEFONE">Telefone</option>
                            <option value="TRANSPORTE">Transporte</option>
                            <option value="LAZER">Lazer</option>
                            <option value="OUTRO">Outro</option>
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

                            {despesas.length > 0 && despesas.map((item:despesa, index:number) =>
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

