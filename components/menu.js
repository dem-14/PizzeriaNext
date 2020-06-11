import { useState } from 'react'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import MenuOptions from './menuoptions'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import  MenuContext from './menucontext'
import { useContext } from 'react'
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));

export default function Menu() {
    const {
        mobileOpen,
        handleDrawerToggle,
    } = useContext(MenuContext)

    const classes = useStyles()
    const theme = useTheme();

    const container = undefined;

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
            <Hidden smUp implementation="css">
                <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true,
                    }}
                >
                    <MenuOptions />
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
                <Drawer
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                >
                    <MenuOptions />
                </Drawer>
            </Hidden>
        </nav>
    )
}