import Head from 'next/head'
import Layout from '../components/layout'
import MaterialTable from 'material-table'
import { useState, useEffect } from 'react';
import IngredientService from '../services/ingredients';
import tableIcons from '../components/tableicon';

export default function Ingredients() {
  const [loaded, setLoaded] = useState(false);
  const [columns, _] = useState([
    {
      title: "Nombre",
      field: "name",
    },
    {
      title: "Precio",
      field: "price",
      type: "numeric"
    }
  ])
  const [data, setData] = useState([]);

  async function getIngredients() {
    const data = await IngredientService.getAll();
    setData(data);
    setLoaded(true);
  }
  useEffect(() => {
    if (!loaded) getIngredients()
  }, [])
  async function addIngredient(newData) {
    try {
      await IngredientService.add({ name: newData.name, price: newData.price })
    }
    catch (error) {
      throw new Error(400)
    }
    setData([...data, newData]);
  }
  async function updateIngredient(newData, oldData) {
    try {
      await IngredientService.update(oldData.id, { id: oldData.id, name: newData.name, price: newData.price })
    }
    catch (error) {
      throw new Error(400)
    }
    const dataUpdate = [...data];
    const index = oldData.tableData.id;
    dataUpdate[index] = newData;
    setData([...dataUpdate]);
  }
  async function deleteIngredient(oldData) {
    try {
      await IngredientService.remove(oldData.id)
    }
    catch (error) {
      throw new Error(400)
    }
    const dataDelete = [...data];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);
    setData([...dataDelete]);
  }
  return (
    <>
      <Head>
        <title>Ingredientes</title>
      </Head>
      <Layout>
        <MaterialTable
          title="ingredientes"
          icons={tableIcons}
          columns={columns}
          data={data}
          options={{
            paging: false,
            search: false,
          }}
          editable={{
            onRowAdd: addIngredient,
            onRowUpdate: updateIngredient,
            onRowDelete: deleteIngredient,
          }} />
      </Layout>
    </>
  )
}
