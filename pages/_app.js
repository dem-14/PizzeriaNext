import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { useEffect } from 'react'
import Router from 'next/router'
import User from '../services/user'

function App({ Component, pageProps }) {
    //const sheets = new ServerStyleSheets();
    //sheets.collect()
    //const css = sheets.toString();

    useEffect(() => {
        async function getUser() {
            const user = await User.get();
            // TODO extraer la URL de administrador a un
            // array y cambiar el if
            // TODO verificar que el token no está caducado,
            // si lo está llamar a refresh

        
            Router.events.on('routeChangeStart', url => {
                if (url.includes("pizzas/add") ||
                    url.includes("pizzas/edit") ||
                    url.includes("ingredients")) {
                    if (!user) {
                        Router.push('/')
                    }
                }
            })
        }
        getUser();
    }, [])
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            </Head>
            <CssBaseline />
            <Component {...pageProps} />
        </>
    )
}
export default App;