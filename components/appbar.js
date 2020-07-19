import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { drawerWidth } from './menu'
import User from '../components/user'
import Search from './search'

import { useContext } from 'react'
import MenuContext from './menucontext';
const useStyles = makeStyles((theme) => ({
   
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
}));
export default function appBar() {
    const { handleDrawerToggle } = useContext(MenuContext);
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton}
                    color="inherit" aria-label="menu"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Search></Search>
                <User></User>
            </Toolbar>
        </AppBar>
  
    )
}