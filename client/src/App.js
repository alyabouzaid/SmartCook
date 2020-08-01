import React from "react";
import "./App.css";
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from "./components/ingredientInventory/IngredientInventory";
import { Route, Switch } from "react-router-dom";
import Journal from "./components/journal/journal";
import JournalView from "./components/journal/journalView";
import FoodPicturesAllPost from "./components/foodPictures/foodPicturesAllPost";
import FoodPicturesCreatePost from "./components/foodPictures/foodPicturesCreatePost";
import FoodPicturesMyPost from "./components/foodPictures/foodPicturesMyPost";
import FeaturedPostCarousel from "./components/foodPictures/featuredPostCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { changeColor } from "./actions/colorActions";
import Header from "./components/login/Header";
import Footer from "./components/footer/footer";
import Settings from "./components/login/settings";

toast.configure();
class App extends React.Component {
  render() {
    // pink
    // const mainPrimaryColor = this.props.isDark ? "#f48fb1" : "#3f50b5"; // button
    // const mainSecondaryColor = this.props.isDark ? "#aa647b" : "#e0f2f1"; // header

    // orange
    // const mainPrimaryColor = this.props.isDark ? orange[500] : "#3f50b5"; // button
    // const mainSecondaryColor = this.props.isDark ? "#b26a00" : "#e0f2f1"; // header

    // green
    const mainPrimaryColor = this.props.isDark ? "#4db6ac" : "#3f50b5"; // button
    const mainSecondaryColor = this.props.isDark ? "#055e68" : "#e0f2f1"; // header

    // purple
    // const mainPrimaryColor = this.props.isDark ? '#9575cd' : "#3f50b5"; // button
    // const mainSecondaryColor = this.props.isDark ? "#4f3b78" : "#e0f2f1"; // header

    const secondaryContrastText = this.props.isDark ? "#fff" : "#000"; // button
    const mainContrastText = this.props.isDark ? "#fff" : "#fff"; // button

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
            <Route
              path="/ingredientInventory"
              component={IngredientInventory}
            />
            <Route path="/recommendation" component={Recommendation} />
            <Route path="/journal" component={Journal} />
            <Route path="/journalView" component={JournalView} />
            <Route path="/foodPicNewPost" component={FoodPicturesCreatePost} />
            <Route path="/foodPicAllPost" component={FoodPicturesAllPost} />
            <Route path="/foodPicMyPost" component={FoodPicturesMyPost} />
            <Route path="/foodPicFeatured" component={FeaturedPostCarousel} />
            <Route path="/settings" component={Settings} />
          </Switch>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => {
  //name is by convention
  return { isDark: state.colorStore }; //now it will appear as props
};

export default compose(connect(mapStateToProps, { changeColor }))(App);
