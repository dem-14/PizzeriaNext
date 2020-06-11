import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,

}));
export default function MenuOptions() {
    const classes=useStyles();
    const data=[
        {name:'Pizzas',path:'/'},
        {name:'Ingredientes', path:'/ingredients'}
    ]
    return (<div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
            {data.map((obj, index) => (
                <Link key={obj.name} href={obj.path}>
                    <ListItem button>
                        <ListItemText primary={obj.name}/>
                    </ListItem>
                </Link>
            ))}
        </List>
    </div>)
}