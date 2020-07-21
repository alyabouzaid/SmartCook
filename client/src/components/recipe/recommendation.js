import React from 'react';
import { connect } from 'react-redux';
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
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IngredientList from "./IngredientList";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
import {initialData} from "../../actions/ingredientInventoryActions";
import CategoryList from "./CategoryList";
import FilterSearchBar from "./FilterSearchBar";
import RecipeInfo from "./RecipeInfo";

const useStyles = (theme) => ({
    root: {
        height: '100vh',
        flexGrow: 1,
        // marginLeft: "3%",
    },
    cardGrid: {
        // paddingTop: theme.spacing(8), // removed this
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 100, // increases image height
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
        // height: '150px',
        whiteSpace: "wrap",
        overflow: "hidden",
        minWidth: "0",
        textOverflow: "ellipsis", // doesn't work

    },
    button: {
        textAlign: "left",
        width: "100%",
        textTransform: 'capitalize',
        justifyContent: "left", // aligns button to left of container
        fontSize: "16px",
    },
});


class Recommendation extends React.Component {

    componentDidMount() {
        this.props.initialData();
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
            <Header/>
            <div style={{margin: "3%"}}>
                {/*<h1 style={{backgroundColor: "tan", textAlign: "center"}}>Test</h1>*/}

                <Grid container component="main" className={classes.root} spacing={3}>

                    {/*left side*/}
                    <Grid style={{}} item xs={false} sm={4} md={2}>
                        <FilterSearchBar/>

                        <p style={{textAlign: "left", backgroundColor: "floralWhite", margin: "3", fontSize: '24px'}}/>

                        <CategoryList/>
                        <p style={{textAlign: "left", backgroundColor: "floralWhite", margin: "3", fontSize: '24px'}}/>
                        <IngredientList/>
                        <p style={{textAlign: "left", backgroundColor: "floralWhite", margin: "3", fontSize: '24px'}}/>
                        <Button className={classes.button} variant="contained" color="primary"
                                onClick={() => this.props.getRecommendation(this.props.ingredientInventory.filter((ingredient) => ingredient.selected), this.props.recommendationFilter)}>
                            Generate Recommendation
                        </Button>
                    </Grid>

                    {/*padding*/}
                    <Grid style={{}} item xs={false} sm={4} md={1}>
                    </Grid>

                    {/*right side*/}
                    <Grid style={{}} item xs={12} sm={8} md={8}>
                        {this.props.recommendation["hits"] &&
                        <Container className={classes.cardGrid}>
                            <Grid style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}} container spacing={3}>
                                <Grid container item xs={12} spacing={3} justify="center">
                                    {this.props.recommendation["hits"].map(recipe =>
                                        <Grid item xs={12} sm={6} md={4}>
                                            <RecipeInfo recipe={recipe}/>
                                        </Grid>
                                    )
                                    }
                                </Grid>
                            </Grid>
                        </Container>
                        }
                    </Grid>

                </Grid>
            </div>
        </div>
    );
    }

    // render() {
    //     const {classes} = this.props;
    //     return (this.props.userInfo.isLoggedIn ?
    //             (<div style={{backgroundImage: `url(${pic})`, height: 1000, backgroundSize: 'cover'}}>
    //                 <Header/>
    //                 <div style={{display: 'flex', flexWrap: 'wrap', margin: '3%', background: 'rgba(255, 255, 255, 0.6)'}}>
    //                     <FormControl component="fieldset" style={{margin: '3%'}}>
    //                         <FormLabel component="legend">Select Your Ingredients</FormLabel>
    //                         <FormGroup>
    //                             {this.props.ingredientInventory.map((ingredient) =>
    //                                 <FormControlLabel key={ingredient.id}
    //                                                   control={<Checkbox checked={ingredient.selected}
    //                                                                      onChange={() => {this.props.selectingIngredient(ingredient.key);}}
    //                                                                      name={ingredient.description}
    //                                                                      color="primary"/>}
    //                                                   label={ingredient.description}
    //                                 />
    //                             )}
    //                         </FormGroup>
    //                     </FormControl>
    //                 </div>
    //                 <div>
    //                     <Button variant="contained" color="primary"
    //                             onClick={() => this.props.getRecommendation(this.props.ingredientInventory.filter((ingredient) => ingredient.selected))}>
    //                         Generate Recommendation
    //                     </Button>
    //                 </div>
    //                 <div style={{backgroundColor: 'white'}}>
    //                     {this.props.recommendation["hits"] &&
    //                     <Container className={classes.cardGrid}>
    //                         <Grid style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', margin: '3%'}} container spacing={3}>
    //                             {/*<div style={{display: 'flex', flexWrap: 'wrap', margin: '3%'}}>*/}
    //                             {this.props.recommendation["hits"].map(recipe =>
    //                                 <Grid item xs={10} sm={6} md={4}>
    //                                     <RecipeCard className={classes.card} recipe={recipe}/>
    //                                 </Grid>
    //                             )
    //                             }
    //                             {/*</div>*/}
    //                         </Grid>
    //                     </Container>
    //                     }
    //                 </div>
    //             </div>) : (this.defaultPage())
    //
    //     );
    // }

}

const mapStateToProps = (state) => { //name is by convention
    return {
        ingredientInventory: state.ingredientInventory,
        recommendation: state.recommendationStore,
        recommendationFilter: state.recommendationFilterStore,
        userInfo: state.userStore}; //now it will appear as props
};
export default compose(withStyles(useStyles), connect(mapStateToProps, {selectingIngredient, newRecommendation, clearRecommendation, getRecommendation, loadUserData, initialData}))(Recommendation);

// export default connect(mapStateToProps, {selectingIngredient, newRecommendation, clearRecommendation, getRecommendation, loadUserData})(Recommendation);
