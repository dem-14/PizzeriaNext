import Head from 'next/head'
import Layout from '../components/layout'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles';
const AlgoliaRepository = require('../app/infraestructure/algoliarepository')
import PizzaCard from '../components/pizzacard'
import { get, del } from 'idb-keyval';
import { useEffect, useState } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import Router from 'next/router'
const LRU = require("lru-cache")




const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const apiCache = new LRU({
  max: 100,
  maxAge: 1000 * 60 * 5, // 5 minutes.
});

export async function getServerSideProps(context) {
  const url = context.req.url
  let pizzas = apiCache.get(url);
  if (!pizzas) {
    pizzas = await AlgoliaRepository.get(context.query);
    apiCache.set(url, pizzas);
  }
  return {
    props: {
      pizzas: pizzas.hits,
      count: pizzas.nbPages,
      page: pizzas.page,
      query: context.query,
    }
  };
}
/* return {
  props: {
    pizzas: pizzas.hits,
    count: pizzas.nbPages,
    page: pizzas.page
  }
}; */

export default function Home({ pizzas, count, page, query }) {
  const [loaded, setLoaded] = useState(false);
  const [_page, setPage] = useState(page);

  const classes = useStyles();

  useEffect(() => {
    async function loaded() {
      const pizza = await get('pizza')
      if (pizza) {
        await del('pizza')
        const result = pizzas.find(p => p.objectID === pizza.id)
        if (!result) {
          pizzas.unshift(pizza)
        }
      }
      setLoaded(true)
    }
    loaded()
  }, [])

  const handleChange = (event, value) => {
    const { text } = query
    if (_page !== value) {
      const url = value === 1 ?
        `/?text=${text || ''}` :
        `/?text=${text || ''}&page=${value - 1}`
      Router.push(url)
    }
  };

  function addButton() {
    // TODO comprobar que el usuario existe y es admin

    return (
      <Link href='/pizzas/add'>
        <Fab className={classes.fab} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Link>)
  }

  return (
    <>
      <Head>
        <title>Pizzeria</title>
      </Head>
      <Layout className={classes.root}>
        <Pagination count={count} page={_page} onChange={handleChange} />
        {pizzas.map(p => <PizzaCard key={p.id || p.objectID} pizza={p} />)}
        {addButton()}
      </Layout>
    </>
  )
}
