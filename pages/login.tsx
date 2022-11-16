import React, { useState } from "react"
import style from '../styles/login.module.css'
import TextField from "@mui/material/TextField"
import MyButton from "../components/login_buttons"
import { useRouter } from 'next/router'

function validateEmail(email: string) {
    var filter = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
    return String(email).search(filter) != -1;
}
function validatePassword(password: string) {
    var filter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return String(password).search(filter) != -1;
}
function validadeFilds(email: string ,password: string){
    let valid = true;
    console.clear()

    if(!validateEmail(email)){
        valid = false;
        console.log("email incorreto")
    }
    if(!validatePassword(password)){
        
        valid = false;
        console.log("senha incorreta")
    }

    console.log(valid);

    return valid;   
}


export default function Login() {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    function handleCadastro(){
    }
    
    function useLogin(){

        if(validadeFilds(email, password)){
            router.push('/home');
        }
    }
    return(
        <div>
            <main className={style.login_back}>
                <section className={style.login_center}>
                    <h1 className={style.login_logo}>WALLE</h1>
                    <TextField className={style.login_input}
                    id="email" label="Email" 
                    value={email} type="email"
                    variant="standard" 
                    onChange={(e) => setEmail(e.target.value) }
                    />
                    <TextField className={style.login_input} 
                    id="senha" label="Senha" 
                    value={password} type="password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value) }
                    />
                    <section className={style.login_buttons}>
                        <MyButton handleEvent={handleCadastro}>Cadastrar</MyButton>
                        <MyButton handleEvent={useLogin}>Entrar</MyButton>
                    </section>
                </section>
            </main>
        </div>
    )
}