import React from 'react'
import style from '../styles/home.module.css'
import { Input } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/home.module.css'
const home = () => {

    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#ffffff',
                darker: '#ffffff',
            },
        },
    });
  return (
    <div>
        <header>
            <h1 className={style.home_logo}>Walle</h1>
        </header>
        <main>
            <section className={style.home_section}>
                <article>
                    <ThemeProvider theme={theme}>
                        <Input variant="standard" label="Valor" color="primary" />
                    </ThemeProvider>

                </article>
            </section>
        </main>
    </div>
  )
}

export default home

