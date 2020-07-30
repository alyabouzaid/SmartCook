import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { selectingIngredient } from "../../actions/selectIngredientActions";
import {
  newRecommendation,
  clearRecommendation,
} from "../../actions/recommendationActions";
import { getRecommendation } from "../../actions/recommendationActions";
import { loadUserData } from "../../actions/userActions";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import IngredientList from "./IngredientList";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
import { initialData } from "../../actions/ingredientInventoryActions";
import { loadRecipesData} from "../../actions/recipesAction";
import CategoryList from "./CategoryList";
import FilterSearchBar from "./FilterSearchBar";
import RecipeInfo from "./RecipeInfo";
import SPagination from "simple-react-pagination-js";
import "simple-react-pagination-js/build/style.css";
import DisplayTabs from "./DisplayTabs";

const useStyles = (theme) => ({
  root: {
    height: "100vh",
    flexGrow: 1,
    // marginLeft: "3%",
  },
  cardGrid: {
    // paddingTop: theme.spacing(8), // removed this
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 100, // increases image height
    paddingTop: "56.25%", // 16:9
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
    // width: "100%",
    textTransform: "capitalize",
    justifyContent: "left", // aligns button to left of container
    fontSize: "16px",
  },
  pagination: {
    display: "inline-block",
    textAlign: "center",
    marginBottom: 50,
  },
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
  }

  handleSwitchEnum = (s) => {
    this.setState({ switch: s} );
  };

  handleOnPageChange = (currentPage) => {
    const selectedPage = currentPage;
    const offset = (selectedPage - 1) * this.state.perPage;
    this.setState({ currentPage: selectedPage });
    this.setState({ offset: offset });
    this.displayData();
  };

  handleOnSizeChange = (perPage) => {
    this.setState({ perPage, currentPage: 1 });
  };

  displayData = () => {
    // return <div>{JSON.stringify(this.props.allPostLoading)}</div>;
    const data = this.props.recommendation[this.state.switch];
    const sliceData = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    // return <div>{JSON.stringify(sliceData[0])}</div>;
    return sliceData.map((recipe) => {
      return (
        <Grid item xs={12} sm={6} md={4}>
          <RecipeInfo recipe={recipe} userInfo={this.props.userInfo} />
        </Grid>
      );
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div style={{ margin: "3%" }}>
          {/*<h1 style={{backgroundColor: "tan", textAlign: "center"}}>Test</h1>*/}

          <Grid container component="main" className={classes.root} spacing={3}>
            {/*left side*/}
            <Grid style={{}} item xs={false} sm={4} md={2}>
              <FilterSearchBar />

              <p
                style={{
                  textAlign: "left",
                  backgroundColor: "floralWhite",
                  margin: "3",
                  fontSize: "24px",
                }}
              />

              <CategoryList />
              <p
                style={{
                  textAlign: "left",
                  backgroundColor: "floralWhite",
                  margin: "3",
                  fontSize: "24px",
                }}
              />
              <IngredientList />
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
                onClick={() =>
                  this.props.getRecommendation(
                    this.props.ingredientInventory.filter(
                      (ingredient) => ingredient.selected
                    ),
                    this.props.recommendationFilter
                  )
                }
              >
                RECOMMEND
              </Button>
            </Grid>

            {/*padding*/}
            <Grid style={{}} item xs={false} sm={4} md={1}></Grid>

            {/*right side*/}
            <Grid style={{}} item xs={12} sm={8} md={8}>
              <DisplayTabs switchHandler={this.handleSwitchEnum}/>
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
                      {/* {this.props.recommendation["hits"].map((recipe) => (
                        <Grid item xs={12} sm={6} md={4}>
                          <RecipeInfo recipe={recipe} />
                        </Grid>
                      ))} */}
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
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //name is by convention
  return {
    ingredientInventory: state.ingredientInventory,
    recommendation: state.recommendationStore,
    recommendationFilter: state.recommendationFilterStore,
    userInfo: state.userStore,
  }; //now it will appear as props
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
    loadRecipesData
  })
)(Recommendation);
