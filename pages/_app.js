import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline';
import { ServerStyleSheets} from '@material-ui/core/styles';
function App({ Component, pageProps }){
    //const sheets = new ServerStyleSheets();
    //sheets.collect()
    //const css = sheets.toString();
    return (
        <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
        </Head>
        <CssBaseline/>
        <Component {...pageProps}/>
        </>
    )
}
export default App;