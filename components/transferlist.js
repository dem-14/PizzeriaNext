import CustomList from './customlist'
import { useState } from 'react'
import CustomListContext from './customlistcontext'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}));

export function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

export function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
    return [...a, ...not(b, a)];
}

export default function TransferList({ left, leftTitle, right, rightTitle, setLeft, setRight }) {
    const classes = useStyles();
    const [checked, setChecked] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const customlistcontext = { checked, handleToggle, handleToggleAll, numberOfChecked };

    return (
        <CustomListContext.Provider value={customlistcontext}>
            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item><CustomList title={leftTitle} items={left} /></Grid>
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedRight}
                            disabled={left.length === 0}
                            aria-label="move selected right"
                        >
                            &gt;
                        </Button>
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleCheckedLeft}
                            disabled={right.length === 0}
                            aria-label="move selected left"
                        >
                            &lt;
                       </Button>
                    </Grid>
                </Grid>
                <Grid item><CustomList title={rightTitle} items={right} /></Grid>
            </Grid>
        </CustomListContext.Provider>
    )
}
