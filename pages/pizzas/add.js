import Head from 'next/head'
import Layout from '../../components/layout'
import { useState, useEffect } from 'react'
import IngredientService from '../../services/ingredients'
import TransferList from '../../components/transferlist'
import { useForm } from 'react-hook-form'
import { PIZZAVALIDATOR } from '../../app/validators/pizzavalidator'
import { getBuilderProp } from '../../app/application/validatorbuilder'
import PizzaClient from '../../services/pizzas'
import Input from '../../components/input'
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { DropzoneArea } from 'material-ui-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import cloudinaryService from '../../services/cloudinary'
import Router from 'next/router'
import { set } from 'idb-keyval';


const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        display: 'grid',
        gridTemplateRows: 'auto auto auto auto',
        gridRowGap: '8px',
    },
}));

export default function Add() {
    const classes = useStyles();

    const [send, sendState] = useState(false)
    const [loaded, setLoaded] = useState(false);
    const [left, setLeft] = useState([]);
    const [right, setRight] = useState([])
    const [image, setImage] = useState(null);
    const { handleSubmit, register, errors } = useForm();
    const validators = {
        validator: getBuilderProp(PIZZAVALIDATOR),
        register,
        errors
    }

    useEffect(() => {
        async function getIngredients() {
            if (!loaded) {
                const ingredients = await IngredientService.getAll();
                setLeft(ingredients);
                setLoaded(true);
            }
        }
        getIngredients()
    }, [])

    async function onSubmit(data) {
        sendState(true);
        try {
            data = { ...data, ingredients: right, image: image}
            const pizza = await PizzaClient.add(data)
            await set('pizza', pizza)
            Router.push('/');
        }
        finally {
            sendState(false);
        }
    }
    const transferProps = {
        left,
        leftTitle: "Ingredientes",
        right,
        rightTitle: "Utilizados",
        setLeft,
        setRight
    }
    function linear() {
        if (send) {
            return (<LinearProgress />)
        }
        return null;
    }
    async function uploadImage(ev) {
        if (ev[0]) {
            const image = await cloudinaryService.upload(ev[0])
            setImage(image)
            return;
        }
        setImage(null)
    }
    function handleBack() {
        Router.back()
    }
    return (
        <>
            <Head>
                <title>Crear pizza</title>
            </Head>
            {linear()}
            <Layout>
                <form className={classes.container} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Input label="Nombre *" type="text" name="name" validators={validators} />
                    <TransferList {...transferProps} />
                    <DropzoneArea
                        acceptedFiles={['image/*']}
                        dropzoneText={"Arrastrar imagen o hacer click"}
                        filesLimit={1}
                        onChange={uploadImage}
                    />
                    <div className="button-container">
                        <Button type="submit" variant="contained" color="primary">
                            Guardar
                        </Button>
                        <Button variant="contained" onClick={handleBack} >
                            Atrás
                        </Button>
                    </div>
                </form>
            </Layout>
        </>
    )
}
