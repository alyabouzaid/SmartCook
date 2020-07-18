import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import MainCard from "./MainCard";
import GridPost from "./GridPost";
import GridList from "@material-ui/core/GridList";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Header from "../login/Header";
import pic from "../login/landingPage.jpg";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { getFeaturedFoodPicPost } from "../../actions/foodPicturesActions";
import FeaturedPostCarousel from "../foodPictures/featuredPostCarousel";

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
});

const gridCardContent = [
  {
    heading: "Track",
    title: "Ingredient Inventory",
    description:
      "Track all available ingredients in your pantry and fridge with ease",
  },
  {
    heading: "Recommend",
    title: "Recipes",
    description:
      "Recommends different recipes based on your preference and ingredients available on hand",
  },
  {
    heading: "Create",
    title: "Recipe Journal",
    description:
      "Create and customize your favourite recipes into personal recipe journal",
  },
  {
    heading: "Share",
    title: "Food Pictures",
    description:
      "Share the joy and vote for food pictures among friends and family members",
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
        "Love to cook but always struggle to come up with ideas?  SmartCook is a web app designed for all food lovers who enjoy cooking,exploring new recipes, creating recipe journals, and socializing about food/cooking",
      description2:
        "SmartCook is a web app designed for all food lovers who enjoy cooking,exploring new recipes, creating recipe journals, and socializing about food/cooking",
      description_isAuthenticated:
        "Enjoy your cooking experience with SmartCook",
      image: "./gallery/landingPage.jpg",
    };

    return (
      <div>
        <Header />
        <img
          style={{ display: "none" }}
          src="./frontend/gallery/homePage.png"
        />
        {/* <MainCard
          card={mainCardContent}
          isAuthenticated={this.props.userInfo.isLoggedIn}
        /> */}
        <FeaturedPostCarousel
          card={mainCardContent}
          isAuthenticated={this.props.userInfo.isLoggedIn}
          featuredPosts={this.props.featuredPosts}
        />
        {/* <div className={classes.gridListHeader}>
          <Typography variant="h4" component="h2">
            Main Features
          </Typography>
        </div> */}
        <div className={classes.gridList}>
          <GridList cols={4} justify="center">
            {gridCardContent.map((item) => {
              return <GridPost key={item.heading} content={item}></GridPost>;
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
    featuredPosts: state.foodPicturesStore.featuredPosts,
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(LandingPage);

//
// const useStyles = makeStyles((theme) => ({
//   gridList: {
//     display: "flex",
//     justifyContent: "center",
//     paddingTop: 50,
//     paddingLeft: 100,
//     paddingRight: 100,
//     border: "none",
//   },
//   gridListHeader: {
//     display: "flex",
//     justifyContent: "center",
//   },
// }));
//
// const mainCardContent = {
//   title: "Simple and fun way to start your cooking journey",
//   title_isAuthenticated: "Welcome back Lily",
//   description:
//     "Love to cook but always struggle to come up with ideas?  SmartCook is a web app designed for all food lovers who enjoy cooking,exploring new recipes, creating recipe journals, and socializing about food/cooking",
//   description2:
//     "SmartCook is a web app designed for all food lovers who enjoy cooking,exploring new recipes, creating recipe journals, and socializing about food/cooking",
//   description_isAuthenticated: "Enjoy your cooking experience with SmartCook",
//   image: "./gallery/landingPage.jpg",
// };
//
// const gridCardContent = [
//   {
//     heading: "Track",
//     title: "Ingredient Inventory",
//     description:
//       "Track all available ingredients in your pantry and fridge with ease",
//   },
//   {
//     heading: "Recommend",
//     title: "Recipes",
//     description:
//       "Recommends different recipes based on your preference and ingredients available on hand",
//   },
//   {
//     heading: "Create",
//     title: "Recipe Journal",
//     description:
//       "Create and customize your favourite recipes into personal recipe journal",
//   },
//   {
//     heading: "Share",
//     title: "Food Pictures",
//     description:
//       "Share the joy and vote for food pictures among friends and family members",
//   },
// ];
//
// export default function LandingPage(props) {
//   const classes = useStyles();
//
//   const [isUserAuthenticated, setisUserAuthenticated] = useState(false);
//
//   const handleLogin = () => {
//     console.log("Checking value: ");
//     setisUserAuthenticated(true);
//   };
//
//   const handleLogout = () => {
//     console.log("Checking value: ");
//     setisUserAuthenticated(false);
//   };
//
//   return (
//     <div>
//       <Header
//         login={handleLogin}
//         logout={handleLogout}
//         isAuthenticated={isUserAuthenticated}
//       />
//       <img style={{ display: "none" }} src="./frontend/gallery/homePage.png" />
//       <MainCard card={mainCardContent} isAuthenticated={isUserAuthenticated} />
//       <div className={classes.gridListHeader}>
//         <Typography variant="h4" component="h2">
//           Main Features
//         </Typography>
//       </div>
//       <div className={classes.gridList}>
//         <GridList cols={4} justify="center">
//           {gridCardContent.map((item) => {
//             return <GridPost key={item.heading} content={item}></GridPost>;
//           })}
//         </GridList>
//       </div>
//     </div>
//   );
// }
