import React from 'react'
import style from '../styles/home.module.css'

const home = () => {


  return (
    <div>
        <header>
            <h1 className={style.home_logo}>Walle</h1>
        </header>
        <main>
            <section className={style.home_section}>
                <article className={style.home_article}>
                    <input type={"number"} className={style.home_input} placeholder={"Valor"}/>
                    <select className={style.home_input} placeholder={"Moeda"}>
                        <option value="BRL">BRL</option>
                        <option value="DOLAR">DOLAR</option>
                    </select>
                    <select className={style.home_input} placeholder={"Metodo de Pagamento"}>
                        <option value="DINHEIRO FISICO">Dinheiro Fisico</option>
                        <option value="DEBITO OU PIX">Debito ou Pix</option>
                        <option value="CREDITO">Credito</option>
                    </select>
                    <select className={style.home_input} placeholder={"Tag"}>
                        <option value="ALIMENTAÇÃO">Alimentação</option>
                        <option value="AGUA">Agua</option>
                        <option value="LUZ">Luz</option>
                        <option value="TELEFONE">Telefone</option>
                        <option value="TRANSPORTE">Transporte</option>
                        <option value="LAZER">Lazer</option>
                        <option value="OUTRO">Outro</option>
                    </select>
                </article>
                <article className={style.home_article}>
                    <input type={"text"} className={style.home_input_descricao} placeholder={"Descrição"}/>
                    <input type={"submit"} className={style.home_input}/>
                </article>
            </section>
            <section className={style.home_section}>
                <article>
                    <table className={style.home_table}>
                        <thead>
                            <tr>
                                <th className={style.home_table_td_th}>Valor</th>
                                <th className={style.home_table_td_th}>Moeda</th>
                                <th className={style.home_table_td_th}>Metodo de Pagamento</th>
                                <th className={style.home_table_td_th}>Tag</th>
                                <th className={style.home_table_td_th}>Descricao</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={style.home_table_td_th}>20</td>
                                <td className={style.home_table_td_th}>BRL</td>
                                <td className={style.home_table_td_th}>DINHEIRO</td>
                                <td className={style.home_table_td_th}>ALIMENTAÇÃO</td>
                                <td className={style.home_table_td_th}>compra de uma coxinha</td>
                            </tr>
                            <tr>
                                <td className={style.home_table_td_th}>20</td>
                                <td className={style.home_table_td_th}>BRL</td>
                                <td className={style.home_table_td_th}>DINHEIRO</td>
                                <td className={style.home_table_td_th}>ALIMENTAÇÃO</td>
                                <td className={style.home_table_td_th}>compra de uma coxinha</td>
                            </tr>
                        </tbody>
                    </table>
                </article>
            </section>
            <section className={style.home_end_page}>
                <article className={style.home_article_edicao_data}>
                    <button className={style.home_button}>Aumentar Data</button>
                    <h1 className={style.home_texto_data}>11/09</h1>
                    <button className={style.home_button}>Diminuir Data</button>

                    <button className={style.home_button}>Editar Periodo</button>
                </article>
                <article>
                    <h1 className={style.home_texto_data}>R$ 40</h1>
                </article>
            </section>
        </main>
    </div>
  )
}

export default home

