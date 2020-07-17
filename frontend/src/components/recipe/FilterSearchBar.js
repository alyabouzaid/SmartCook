import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

// TODO: temporary mock filters
const filterOptions = [
    "Fruits", "Meat", "Seafood", "Vegetables"
];

class FilterSearchBar extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader style={{fontSize: "18px", textAlign: "left"}} component="div" id="nested-list-subheader">
                        Select Ingredient Filter:
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem>
                    <Autocomplete
                        id="search-filter"
                        options={filterOptions}
                        getOptionLabel={(option) => option}
                        style={{ width: "100%" }}
                        renderInput={(params) => <TextField {...params} label="Filter" variant="outlined" />}
                    />
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = (state) => {
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps)
)(FilterSearchBar);