import { makeStyles } from '@material-ui/core/styles'
import { Divider } from '@material-ui/core';
import AppBar from './appbar'
import Menu from './menu'
import MenuContext from './menucontext';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Layout({ children }) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [search, setSearch] = useState({})

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menu = {
        mobileOpen,
        handleDrawerToggle,
    }

    return (
        <MenuContext.Provider value={menu}>
            <div className={classes.root}>
                <AppBar />
                <Menu />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        </MenuContext.Provider>
    )
}