import React from 'react';
import { connect } from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import RecipeCard from "./recipeCard";
import Button from "@material-ui/core/Button";
import Header from "../login/Header";
import pic from "../login/landingPage.jpg";
import {selectingIngredient} from "../../actions/selectIngredientActions";
import {newRecommendation, clearRecommendation} from "../../actions/recommendationActions";
import {getRecommendation} from "../../actions/recommendationActions";
import {loadUserData} from "../../actions/userActions";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import { withStyles} from "@material-ui/core/styles";
import compose from "recompose/compose";

const useStyles = (theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
});


class Recommendation extends React.Component {

    defaultPage() {
        return (<div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
            <Header/>
            <h1>You must log in</h1>
        </div>);
    }

    render() {
        const {classes} = this.props;
        return (this.props.userInfo.isLoggedIn ?
                (<div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
                    <Header/>
                    <div style={{display: 'flex', flexWrap: 'wrap', margin: '3%', background: 'rgba(255, 255, 255, 0.6)'}}>
                        <FormControl component="fieldset" style={{margin: '3%'}}>
                            <FormLabel component="legend">Select Your Ingredients</FormLabel>
                            <FormGroup>
                                {this.props.ingredientInventory.map((ingredient) =>
                                    <FormControlLabel key={ingredient.id}
                                                      control={<Checkbox checked={ingredient.selected}
                                                                         onChange={() => {this.props.selectingIngredient(ingredient.key);}}
                                                                         name={ingredient.description}
                                                                         color="primary"/>}
                                                      label={ingredient.description}
                                    />
                                )}
                            </FormGroup>
                        </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" color="primary"
                                onClick={() => this.props.getRecommendation(this.props.ingredientInventory.filter((ingredient) => ingredient.selected))}>
                            Generate Recommendation
                        </Button>
                    </div>
                    <div style={{backgroundColor: 'white'}}>
                        {this.props.recommendation["hits"] &&
                        <Container className={classes.cardGrid}>
                            <Grid style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '3%'}} container spacing={3}>
                                {/*<div style={{display: 'flex', flexWrap: 'wrap', margin: '3%'}}>*/}
                                {this.props.recommendation["hits"].map(recipe =>
                                    <Grid item xs={10} sm={6} md={4}>
                                        <RecipeCard className={classes.card} recipe={recipe}/>
                                    </Grid>
                                )
                                }
                                {/*</div>*/}
                            </Grid>
                        </Container>
                        }
                    </div>
                </div>) : (this.defaultPage())

        );
    }

}

const mapStateToProps = (state) => { //name is by convention
    return { ingredientInventory: state.ingredientInventory,
        recommendation: state.recommendationStore,
        userInfo: state.userStore}; //now it will appear as props
};
export default compose(withStyles(useStyles), connect(mapStateToProps, {selectingIngredient, newRecommendation, clearRecommendation, getRecommendation, loadUserData}))(Recommendation);

// export default connect(mapStateToProps, {selectingIngredient, newRecommendation, clearRecommendation, getRecommendation, loadUserData})(Recommendation);
