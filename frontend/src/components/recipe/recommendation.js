import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RecipeCard from "./recipeCard";
import Button from "@material-ui/core/Button";
import {ingredientList} from "./constants";
import {recipeList} from "./constants";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '3%',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Recommendation() {
    const classes = useStyles();
    let initialState = {};
    ingredientList.forEach((ingredient) => {
        initialState[ingredient] = false;
    });
    const [state, setState] = React.useState(initialState);

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.checked});
    };

    const getRecommendation = () => {
        fetch("https://api.edamam.com/search?q=chicken%26curry%26onion%26basil&app_id=43011121&app_key" +
            "=8ded8a6fbd319218357df399687664aa&from=0&to=10&calories=591-722&health=alcohol-free", {
            method: 'GET',
        })
            .then((res) => res.json())
            .then((res) => {
                   setState({...state, recommendation: res})
            })
    };

    return (
        <div>
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select Your Ingredients</FormLabel>
                    <FormGroup>
                        {ingredientList.map((ingredient) =>
                            <FormControlLabel
                                control={<Checkbox checked={state.ingredient} onChange={handleChange}
                                                   name={ingredient}/>}
                                label={ingredient}
                            />
                        )}
                    </FormGroup>
                </FormControl>
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={getRecommendation}>
                    Generate Recommendation
                </Button>
            </div>
            {   state.recommendation &&
                <div className={classes.root}>
                    {state.recommendation["hits"].map(recipe =>
                        <RecipeCard recipe={recipe}/>
                    )
                    }
                </div>
            }
        </div>
    );
}
