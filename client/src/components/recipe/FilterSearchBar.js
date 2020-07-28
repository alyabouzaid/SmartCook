import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import compose from "recompose/compose";
import {withStyles} from "@material-ui/core/styles";
import {connect} from "react-redux";
import {addFilter} from "../../actions/filterActions";
import {selectingIngredient} from "../../actions/selectIngredientActions";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

const filterOptions = [
    "Dairy", "Fruits", "Grains", "Meat", "Seafood", "Vegetables"
];

class FilterSearchBar extends React.Component {

    updateFilters(newValue) {
        this.props.addFilter(newValue);
        this.updateIngredients();

    }

    updateIngredients() {
        for (let ingredient of this.props.ingredientInventory)
            {
                let found = false;
                for (let i = 0; i < this.props.filter.length; i++) {
                    if (ingredient.category === this.props.filter[i]) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    if (ingredient.selected) {
                        this.props.selectingIngredient(ingredient.key);
                    }
                }
            }
    }

    render() {
        const { classes } = this.props;

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader style={{fontSize: "18px", textAlign: "left"}} component="div" id="nested-list-subheader">
                        Select Ingredient Filter:
                        {/*TODO: use for debugging*/}
                        {/*{this.props.filter}*/}
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem>
                    <Autocomplete
                        multiple
                        id="multiple-search-filter"
                        style={{width: "100%"}}
                        options={filterOptions}
                        value={this.props.filter}
                        getOptionLabel={(option) => option}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="outlined"
                                label="Filter"
                            />
                        )}
                        onChange={(event, newValue) => {
                            this.updateFilters(newValue);
                        }}
                    />
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return { filter: state.filterStore,
        ingredientInventory: state.ingredientInventory};
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, { addFilter, selectingIngredient })
)(FilterSearchBar);