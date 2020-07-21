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

// TODO: temporary mock filters, replace with redux
const filterOptions = [
    "Dairy", "Fruits", "Grains", "Meat", "Seafood", "Vegetables"
];

class FilterSearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filterValue: "",
            filterInput: "",
        }
    };

    // TODO: replace calls to filterOptions with redux
    changeFilterValue(newValue) {
        this.setState({filterValue: (newValue === null ? "" : newValue)});
        if (newValue !== null && filterOptions.includes(newValue)) {
            // TODO: update filtered inventory list state here
        }
        else {
            // TODO: set filtered inventory list to default state here
        }
    }

    changeFilterInput(newInputValue) {
        this.setState({filterInput: (newInputValue === "" ? "" : newInputValue)});
    };

    render() {
        const { classes } = this.props;

        // TODO: replace calls to filterOptions with redux
        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader style={{fontSize: "18px", textAlign: "left"}} component="div" id="nested-list-subheader">
                        Select Ingredient Filter:
                        {/*TODO: use for debugging*/}
                        {/*{this.state.filterValue}*/}
                    </ListSubheader>
                }
                className={classes.root}
            >
                <ListItem>
                    <Autocomplete
                        id="search-filter"
                        options={filterOptions}
                        getOptionLabel={(option) => option}
                        style={{ width: "100%"}}
                        renderInput={(params) => <TextField {...params} label="Filter" variant="outlined" />}
                        value={this.state.filterValue}
                        onChange={(event, newValue) => {
                            this.changeFilterValue(newValue);
                        }}
                        inputValue={this.state.filterInput}
                        onInputChange={(event, newInputValue) => {
                            this.changeFilterInput(newInputValue);
                        }}
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