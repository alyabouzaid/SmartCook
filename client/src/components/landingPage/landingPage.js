import React from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import MainCard from "./MainCard";
import GridPost from "./GridPost";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { getFeaturedFoodPicPost } from "../../actions/foodPicturesActions";
import FeaturedPostCarousel from "../foodPictures/featuredPostCarousel";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";

const useStyles = (theme) => ({
  gridList: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 50,
    paddingLeft: 100,
    paddingRight: 100,
    border: "none",
  },
  gridListHeader: {
    display: "flex",
    justifyContent: "center",
    marginTop: 80,
  },
  gridListIcon: {
    fontSize: 40,
  },
});

const gridCardContent = [
  {
    header: "Track",
    title: "Ingredient Inventory",
    description:
      "Track all different category of ingredients in your pantry and fridge with ease",
    link: "/ingredientInventory",
    icon: <PlaylistAddCheckIcon style={{ fontSize: 50, color: "#4db6ac" }} />,
  },
  {
    header: "Recommend",
    title: "Recipe Recommender",
    description:
      "Recommends different recipes based on your preferences and available ingredients",
    link: "/recommendation",
    icon: <FastfoodOutlinedIcon style={{ fontSize: 42, color: "#4db6ac" }} />,
  },
  {
    header: "Create",
    title: "Recipe Journal",
    description:
      "Create and customize your favourite recipes into personal recipe journal",
    link: "/journalView",
    icon: <CreateOutlinedIcon style={{ fontSize: 42, color: "#4db6ac" }} />,
  },
  {
    header: "Share",
    title: "Food Pictures",
    description:
      "Share the joy and vote for food pictures among friends and family members",
    link: "/foodPicAllPost",
    icon: <ShareOutlinedIcon style={{ fontSize: 42, color: "#4db6ac" }} />,
  },
];

class LandingPage extends React.Component {
  componentDidMount() {
    this.props.getFeaturedFoodPicPost();
  }

  render() {
    const { classes } = this.props;

    let mainCardContent = {
      title: "Simple and fun way to start your cooking journey",
      title_isAuthenticated: "Welcome back " + this.props.userInfo.firstName,
      description:
        "Love to cook but always struggle to come up with ideas? SmartCook is designed for all food lovers who enjoy cooking, exploring new recipes, creating recipe journals, and socializing about food/cooking",
      description_isAuthenticated:
        "Enjoy your cooking experience with SmartCook",
      image: "./gallery/landingPage.jpg",
    };

    return (
      <div>
        <img
          style={{ display: "none" }}
          src="./frontend/gallery/homePage.png"
        />

        {this.props.userInfo.isLoggedIn ? (
          <FeaturedPostCarousel
            card={mainCardContent}
            isAuthenticated={this.props.userInfo.isLoggedIn}
            featuredPost={this.props.featuredPost}
          />
        ) : (
          <MainCard
            card={mainCardContent}
            isAuthenticated={this.props.userInfo.isLoggedIn}
          />
        )}

        <div className={classes.gridList}>
          <GridList cols={4} justify="center">
            {gridCardContent.map((item) => {
              return (
                <GridPost
                  key={item.header}
                  content={item}
                  isAuthenticated={this.props.userInfo.isLoggedIn}
                ></GridPost>
              );
            })}
          </GridList>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getFeaturedFoodPicPost: () => dispatch(getFeaturedFoodPicPost()),
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
    foodPicPost: state.foodPicturesStore,
    featuredPost: state.foodPicturesStore.featuredPost,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(LandingPage);
