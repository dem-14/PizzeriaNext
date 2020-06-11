import Head from 'next/head'
import User from '../components/user'
import Layout from '../components/layout'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Pizzas</title>
      </Head>
      <Layout className={classes.root}>
        <div>Pizzas</div>
        <Link href='/pizzas/add'>
          <Fab className={classes.fab} color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Link>

      </Layout>
    </>
  )
}
