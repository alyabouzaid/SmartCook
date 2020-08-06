import React from 'react';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {selectingIngredient} from "../../actions/selectIngredientActions";
import {withStyles} from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});


let currentCategoryItems = [];

class IngredientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    };

    filter(ingredientInventory) {
        if (Array.isArray(ingredientInventory)){
            currentCategoryItems = this.props.filter.length === 0 ? this.props.ingredientInventory :
                (this.props.ingredientInventory.filter((ingredient) =>
                        {
                            for (let i = 0; i < this.props.filter.length; i++) {
                                if (ingredient.category == this.props.filter[i]){
                                    return true;
                                }
                            }
                            return false;
                        }
                    )
                )
        }
    }

    render() {
        const { classes } = this.props;

        const handleClick = () => {
            let opp = this.state.open;
            this.setState({open: !opp});
        };

        return (
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader style={{fontSize: "18px", textAlign: "left"}} component="div" id="nested-list-subheader">
                        Select Ingredients:
                    </ListSubheader>
                }
                className={classes.root}
            >

                <ListItem button onClick={handleClick}>
                    <ListItemText primary="Ingredient List" />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                        <ListItem>
                            <FormControl component="fieldset" >
                                <FormGroup>
                                    {this.filter(this.props.ingredientInventory)}
                                    {currentCategoryItems.map((ingredient) =>
                                        <FormControlLabel className={classes.nested} key={ingredient.id}
                                                          control={<Checkbox checked={ingredient.selected}
                                                                             onChange={() => {this.props.selectingIngredient(ingredient.key);}}
                                                                             name={ingredient.description}
                                                                             color="primary"/>}
                                                          label={ingredient.description}
                                        />
                                    )}
                                </FormGroup>
                            </FormControl>
                        </ListItem>
                    </List>
                </Collapse>
            </List>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredientInventory: state.ingredientInventory,
        filter: state.filterStore
    };
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, {selectingIngredient})
)(IngredientList);