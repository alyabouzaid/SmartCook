import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import GradeIcon from '@material-ui/icons/Grade';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    },
});

export default function DisplayTabs({switchHandler}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue === 0){
            switchHandler("hits");
        }else if (newValue === 1){
            switchHandler("recipes");
        }
    };

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="icon label tabs example"
            >
                <Tooltip title="Click to see new recommendations" arrow>
                <Tab icon={<FormatListBulletedIcon />}/>
                </Tooltip>
                <Tooltip title="Click to see your favourite recipes" arrow>
                <Tab icon={<FavoriteIcon />}/>
                </Tooltip>
                <Tooltip title="Click to see the most popular recipes" arrow>
                <Tab icon={<GradeIcon />}/>
                </Tooltip>
            </Tabs>
        </Paper>
    );
}
