import React from "react";
import { Route, Switch } from "react-router-dom";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import compose from "recompose/compose";
import { changeColor } from "./actions/colorActions";
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from "./components/ingredientInventory/IngredientInventory";
import Journal from "./components/journal/journal";
import JournalView from "./components/journal/journalView";
import FoodPicturesAllPost from "./components/foodPictures/foodPicturesAllPost";
import FoodPicturesCreatePost from "./components/foodPictures/foodPicturesCreatePost";
import FoodPicturesMyPost from "./components/foodPictures/foodPicturesMyPost";
import FeaturedPostCarousel from "./components/foodPictures/featuredPostCarousel";
import Header from "./components/login/Header";
import Settings from "./components/login/settings";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

toast.configure();

class App extends React.Component {
  render() {
    const mainPrimaryColor = this.props.isDark ? "#4db6ac" : "#3f50b5";
    const mainSecondaryColor = this.props.isDark ? "#055e68" : "#e0f2f1";
    const secondaryContrastText = this.props.isDark ? "#fff" : "#000";
    const mainContrastText = this.props.isDark ? "#fff" : "#fff";

    const darkTheme = createMuiTheme({
      palette: {
        type: this.props.isDark ? "dark" : "light",
        primary: {
          main: mainPrimaryColor,
          contrastText: mainContrastText,
        },
        secondary: {
          main: mainSecondaryColor,
          contrastText: secondaryContrastText,
        },
      },
    });

    return (
      <ThemeProvider theme={darkTheme}>
        <div className={"App"}>
          <CssBaseline />
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/ingredientInventory" component={IngredientInventory} />
            <Route path="/recommendation" component={Recommendation} />
            <Route path="/journal" component={Journal} />
            <Route path="/journalView" component={JournalView} />
            <Route path="/foodPicNewPost" component={FoodPicturesCreatePost} />
            <Route path="/foodPicAllPost" component={FoodPicturesAllPost} />
            <Route path="/foodPicMyPost" component={FoodPicturesMyPost} />
            <Route path="/foodPicFeatured" component={FeaturedPostCarousel} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </div>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => {
  return { isDark: state.colorStore };
};

export default compose(connect(mapStateToProps, { changeColor }))(App);
