import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Checkbox from '@material-ui/core/Checkbox';
import compose from "recompose/compose";
import {connect} from "react-redux";
import {selectingIngredient} from "../../actions/selectIngredientActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";

const useStyles = (theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
});

class IngredientList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        }
    };

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
                        Select Filters:
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
                            {/*<FormLabel component="legend">Select Your Ingredients</FormLabel>*/}
                            <FormGroup>
                                {this.props.ingredientInventory.map((ingredient) =>
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
    //name is by convention
    return { ingredientInventory: state.ingredientInventory}; //now it will appear as props
};

export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, { selectingIngredient })
)(IngredientList);