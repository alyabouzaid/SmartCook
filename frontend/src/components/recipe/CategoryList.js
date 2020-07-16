import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import compose from "recompose/compose";
import {connect} from "react-redux";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CategorySlider from "./CategorySlider";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

const cuisineTypes = [
    "American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", "French",
    "Indian", "Italian", "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Nordic",
    "South American", "South East Asian"
];

const dietTypes = [
    "Balanced", "High-Fiber", "High-Protein", "Low-Carb", "Low-Fat", "Low-Sodium"
];

class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    };

    makeSearchBar(searchBarType, filterOptions) {
        return (
            <Autocomplete
                id={searchBarType}
                options={filterOptions}
                getOptionLabel={(option) => option}
                // style={{ width: 300 }}
                style={{ width: "100%"}}
                renderInput={(params) => <TextField {...params} label={searchBarType} variant="outlined" />}
            />
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader style={{fontSize: "18px", textAlign: "left"}} component="div" id="nested-list-subheader">
                        Select Categories:
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem>
                    {this.makeSearchBar("Cuisine", cuisineTypes)}
                </ListItem>

                <ListItem>
                    {this.makeSearchBar("Diet", dietTypes)}
                </ListItem>

                <ListItem>
                    <CategorySlider category={{name: "Calories", maxValue: 3000}}/>
                </ListItem>

                <ListItem>
                    <CategorySlider category={{name: "Cooking Time", maxValue: 3000}}/>
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
)(CategoryList);