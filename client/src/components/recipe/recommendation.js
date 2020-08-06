import React from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import {selectingIngredient} from "../../actions/selectIngredientActions";
import {
    newRecommendation,
    clearRecommendation,
} from "../../actions/recommendationActions";
import {getRecommendation} from "../../actions/recommendationActions";
import {loadUserData} from "../../actions/userActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {withStyles} from "@material-ui/core/styles";
import compose from "recompose/compose";
import IngredientList from "./IngredientList";
import {initialData} from "../../actions/ingredientInventoryActions";
import {
    loadRecipesData,
    loadRecipesPopularData,
    addNewRecipeData,
    deleteOneRecipeData
} from "../../actions/recipesAction";
import CategoryList from "./CategoryList";
import FilterSearchBar from "./FilterSearchBar";
import RecipeInfo from "./RecipeInfo";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css";
import DisplayTabs from "./DisplayTabs";

import {getRecipeIngredients} from "../../actions/ingredientAmountActions";
import Footer from "../footer/footer";

const useStyles = (theme) => ({
    root: {
        height: "100vh",
        flexGrow: 1,
    },
    cardGrid: {
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        height: 100,
        paddingTop: "56.25%",
    },
    cardContent: {
        flexGrow: 1,
        whiteSpace: "wrap",
        overflow: "hidden",
        minWidth: "0",
        textOverflow: "ellipsis",
    },
    button: {
        textAlign: "left",
        textTransform: "capitalize",
        justifyContent: "left",
        fontSize: "16px",
    },
    pagination: {
        display: "inline-block",
        textAlign: "center",
        marginBottom: 50,
    },
    copyright: {
        paddingTop: theme.spacing(3),
    }
});

class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            currentPage: 1,
            perPage: 9,
            switch: "hits",
        };
    }

    componentDidMount() {
        this.props.initialData();
        this.props.loadRecipesData(this.props.userInfo.email);
        this.props.loadRecipesPopularData();
    }

    handleSwitchEnum = (s) => {
        this.setState({switch: s});
    };

    handleOnPageChange = (currentPage) => {
        const selectedPage = currentPage;
        const offset = (selectedPage - 1) * this.state.perPage;
        this.setState({currentPage: selectedPage});
        this.setState({offset: offset});
        this.displayData();
    };

    handleOnSizeChange = (perPage) => {
        this.setState({perPage, currentPage: 1});
    };


    handleGetRecipeIngredients = (recipe) => {

        this.props.getRecipeIngredients(recipe["recipe"]["ingredientLines"], this.props.userInfo.email, this.props.ingredientInventory)

    };


    displayData = () => {
        const data = this.props.recommendation[this.state.switch];
        const sliceData = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        return sliceData.map((recipe) => {
            return (
                <Grid item xs={12} sm={6} md={4}>
                    <RecipeInfo
                        recipe={recipe}
                        ingredientInventory={this.props.ingredientInventory}
                        userInfo={this.props.userInfo}
                        getRecipeIngredients={this.handleGetRecipeIngredients}
                        ingredientAmountStore={this.props.ingredientAmountStore}
                        saveRecipe={this.props.addNewRecipeData}
                        deleteRecipe={this.props.deleteOneRecipeData}
                        switchDisplay={this.state.switch}
                    />
                </Grid>
            );
        });
    };

    updateIngredients() {
        if (this.props.filter.length !== 0) {
            for (let ingredient of this.props.ingredientInventory) {
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
    }

    generateRecommendation = () => {
        this.updateIngredients();
        this.props.getRecommendation(
            this.props.ingredientInventory.filter(
                (ingredient) => ingredient.selected
            ),
            this.props.recommendationFilter
        )
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <div style={{margin: "3%"}}>
                    <Grid container component="main" className={classes.root} spacing={3}>
                        <Grid style={{}} item xs={false} sm={4} md={2}>
                            <FilterSearchBar/>
                            <p
                                style={{
                                    textAlign: "left",
                                    backgroundColor: "floralWhite",
                                    margin: "3",
                                    fontSize: "24px",
                                }}
                            />
                            <CategoryList/>
                            <p
                                style={{
                                    textAlign: "left",
                                    backgroundColor: "floralWhite",
                                    margin: "3",
                                    fontSize: "24px",
                                }}
                            />
                            <IngredientList/>
                            <p
                                style={{
                                    textAlign: "left",
                                    backgroundColor: "floralWhite",
                                    margin: "3",
                                    fontSize: "24px",
                                }}
                            />
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                onClick={this.generateRecommendation}
                            >
                                RECOMMEND
                            </Button>
                        </Grid>
                        <Grid style={{}} item xs={false} sm={4} md={1}></Grid>
                        <Grid style={{}} item xs={12} sm={8} md={8}>
                            <Grid container item xs={12} spacing={3} justify="center">
                                <DisplayTabs switchHandler={this.handleSwitchEnum}/>
                            </Grid>
                            <p
                                style={{
                                    textAlign: "left",
                                    backgroundColor: "transparent",
                                    margin: "3",
                                    fontSize: "24px",
                                }}
                            />
                            {this.props.recommendation[this.state.switch] && (
                                <Container className={classes.cardGrid}>
                                    <Grid
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            flexWrap: "wrap",
                                        }}
                                        container
                                        spacing={3}
                                    >
                                        <Grid container item xs={12} spacing={3} justify="center">
                                            {this.displayData()}
                                        </Grid>
                                    </Grid>
                                </Container>
                            )}
                            <div className={classes.pagination}>
                                <SPagination
                                    page={this.state.currentPage}
                                    sizePerPage={this.state.perPage}
                                    totalSize={
                                        this.props.recommendation[this.state.switch]
                                            ? this.props.recommendation[this.state.switch].length
                                            : 0
                                    }
                                    pagesNextToActivePage={5}
                                    sizePerPageOptions={[9, 12, 15, 18]}
                                    onPageChange={this.handleOnPageChange}
                                    onSizeChange={this.handleOnSizeChange}
                                />
                                <div className={classes.copyright}>
                                    <Footer/>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredientInventory: state.ingredientInventory,
        recommendation: state.recommendationStore,
        recommendationFilter: state.recommendationFilterStore,
        userInfo: state.userStore,
        ingredientAmountStore: state.ingredientAmountStore,

        filter: state.filterStore,
    };
};
export default compose(
    withStyles(useStyles),
    connect(mapStateToProps, {
        selectingIngredient,
        newRecommendation,
        clearRecommendation,
        getRecommendation,
        loadUserData,
        initialData,
        getRecipeIngredients,
        loadRecipesData,
        loadRecipesPopularData,
        addNewRecipeData,
        deleteOneRecipeData,
    })
)(Recommendation);
