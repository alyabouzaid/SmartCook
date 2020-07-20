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
import {updateDietType} from "../../actions/recommendationFilterActions";

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

// TODO: high-fiber, low-sodium don't work
const dietTypes = [
    "balanced", "high-protein", "low-carb", "low-fat"
];

class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dietValue: "",
            dietInput: "",
        }
    };

    makeCuisineBar(searchBarType, filterOptions) {
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

    changeDietValue(newValue) {
        this.setState({dietValue: (newValue === null ? "" : newValue)});
        if (newValue !== null && dietTypes.includes(newValue)) {
            this.props.updateDietType(String(newValue));
        }
        else {
            this.props.updateDietType("balanced");
        }
    }

    changeDietInput(newInputValue) {
        this.setState({dietInput: (newInputValue === "" ? "" : newInputValue)});
    };

    makeDietBar(searchBarType, filterOptions) {

        return (
            <Autocomplete
                id={searchBarType}
                options={filterOptions}
                getOptionLabel={(option) => option}
                style={{ width: "100%"}}
                renderInput={(params) => <TextField {...params} label={searchBarType} variant="outlined" />}
                value={this.state.dietValue}
                onChange={(event, newValue) => {
                    this.changeDietValue(newValue);
                }}
                inputValue={this.state.dietInput}
                onInputChange={(event, newInputValue) => {
                    this.changeDietInput(newInputValue);
                }}
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
                    {this.makeCuisineBar("Cuisine", cuisineTypes)}
                </ListItem>

                <ListItem>
                    {this.makeDietBar("Diet", dietTypes)}
                </ListItem>

                <ListItem>
                    <CategorySlider category={{name: "Calories (kcal)", maxValue: 3000, startingValue: 1500, sliderStep: 100, inputStep: 50}}/>
                </ListItem>

                <ListItem>
                    <CategorySlider category={{name: "Cooking Time (min)", maxValue: 300, startingValue: 150, sliderStep: 5, inputStep: 5}}/>
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        recommendationFilter: state.recommendationFilterStore
    }
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, {updateDietType})
)(CategoryList);