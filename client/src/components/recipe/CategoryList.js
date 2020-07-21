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
import {updateHealthType} from "../../actions/recommendationFilterActions";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

const healthTypes = [
    "Alcohol-free", "Immuno-supportive", "Peanut-free", "Sugar-conscious", "Tree-nut-free",
    "Vegan", "Vegetarian"
];

// const cuisineTypes = [
//     "American", "Asian", "British", "Caribbean", "Central Europe", "Chinese", "Eastern Europe", "French",
//     "Indian", "Italian", "Japanese", "Kosher", "Mediterranean", "Mexican", "Middle Eastern", "Nordic",
//     "South American", "South East Asian"
// ];

const dietTypes = [
    "Balanced", "High-protein", "Low-carb", "Low-fat"
];

class CategoryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            dietValue: "",
            dietInput: "",
            healthValue: "",
            healthInput: "",
            // cuisineValue: "",
            // cuisineInput: "",
        }
    };

    changeHealthValue(newValue) {
        this.setState({healthValue: (newValue === null ? "" : newValue)});
        if (newValue !== null && healthTypes.includes(newValue)) {
            let lowerCaseString = newValue.toLowerCase();
            this.props.updateHealthType(lowerCaseString);
        }
        else {
            this.props.updateHealthType("alcohol-free");
        }
    }

    changeHealthInput(newInputValue) {
        this.setState({healthInput: (newInputValue === "" ? "" : newInputValue)});
    };

    makeHealthBar(searchBarType, filterOptions) {
        return (
            <Autocomplete
                id={searchBarType}
                options={filterOptions}
                getOptionLabel={(option) => option}
                style={{ width: "100%"}}
                renderInput={(params) => <TextField {...params} label={searchBarType} variant="outlined" />}
                value={this.state.healthValue}
                onChange={(event, newValue) => {
                    this.changeHealthValue(newValue);
                }}
                inputValue={this.state.healthInput}
                onInputChange={(event, newInputValue) => {
                    this.changeHealthInput(newInputValue);
                }}
            />
        );
    }

    // changeCuisineValue(newValue) {
    //     this.setState({cuisineValue: (newValue === null ? "" : newValue)});
    //     if (newValue !== null && cuisineTypes.includes(newValue)) {
    //         let lowerCaseString = newValue.toLowerCase();
    //         this.props.updateCuisineType(lowerCaseString);
    //     }
    //     else {
    //         this.props.updateCuisineType("american");
    //     }
    // }
    //
    // changeCuisineInput(newInputValue) {
    //     this.setState({cuisineInput: (newInputValue === "" ? "" : newInputValue)});
    // };
    //
    // makeCuisineBar(searchBarType, filterOptions) {
    //     return (
    //         <Autocomplete
    //             id={searchBarType}
    //             options={filterOptions}
    //             getOptionLabel={(option) => option}
    //             style={{ width: "100%"}}
    //             renderInput={(params) => <TextField {...params} label={searchBarType} variant="outlined" />}
    //             value={this.state.cuisineValue}
    //             onChange={(event, newValue) => {
    //                 this.changeCuisineValue(newValue);
    //             }}
    //             inputValue={this.state.cuisineInput}
    //             onInputChange={(event, newInputValue) => {
    //                 this.changeCuisineInput(newInputValue);
    //             }}
    //         />
    //     );
    // }

    changeDietValue(newValue) {
        this.setState({dietValue: (newValue === null ? "" : newValue)});
        if (newValue !== null && dietTypes.includes(newValue)) {
            let lowerCaseString = newValue.toLowerCase();
            this.props.updateDietType(lowerCaseString);
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
                    {this.makeHealthBar("Health", healthTypes)}
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
    connect(mapStateToProps, {updateDietType, updateHealthType})
)(CategoryList);