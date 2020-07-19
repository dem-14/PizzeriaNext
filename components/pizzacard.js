import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CloudinaryService from '../services/cloudinary'
import Link from 'next/link'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: 275
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 140,
    },
    left: {
        float: 'left'
    },
    right: {
        float: 'right'
    },
});

function cardMedia(pizza) {
    const classes = useStyles();
    if (!pizza.image) return null;
    return (
        <CardMedia
            className={classes.media}
            image={CloudinaryService.getUrlImage(pizza.image)}
            title={pizza.name}
            alt={pizza.name}
        />
    )
}

export default function PizzaCard({ pizza }) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} gutterBottom>
                    {pizza.name}
                </Typography>
                {cardMedia(pizza)}
                <Typography className={classes.left} variant="h5" component="h2">
                    {pizza.price}
                </Typography>
                <Rating name="read-only" className={classes.right} value={pizza.rating} precision={0.5} readOnly />
            </CardContent>
            <CardActions >
                <Link href={`/pizzas/edit/${pizza.objectID}`}>
                    <Button size="small">Editar</Button>
                </Link>
            </CardActions>
        </Card>
    );
}