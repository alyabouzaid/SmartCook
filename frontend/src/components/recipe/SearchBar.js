import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// TODO: mock filters
const filterOptions = [
    {filter: 'Ingredient Inventory'},
    {filter: 'Fruits'},
    {filter: 'Vegetables'},
    {filter: 'Seafood'},
];

class SearchBar extends React.Component {

    render() {
        return (
            <Autocomplete
                id="search-filter"
                options={filterOptions}
                getOptionLabel={(option) => option.filter}
                // style={{ width: 300 }}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Search for filter" variant="outlined" />}
            />
        );
    }
}

export default SearchBar;