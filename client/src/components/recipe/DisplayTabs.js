import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BeenhereOutlinedIcon from '@material-ui/icons/BeenhereOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

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
                <Tab icon={<BeenhereOutlinedIcon />} label="New Recommendation" />
                <Tab icon={<FavoriteIcon />} label="Saved Recipes" />
                <Tab icon={<PersonPinIcon />} label="Most Popular" />
            </Tabs>
        </Paper>
    );
}
