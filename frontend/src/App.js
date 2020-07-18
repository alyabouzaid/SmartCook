import React from "react";
import "./App.css";
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from "./components/ingredientInventory/IngredientInventory";
import { Route, Switch } from "react-router-dom";
import Journal from "./components/journal/journal";
import JournalView from "./components/journal/journalView";
import FoodPictures from "./components/foodPictures/foodPictures";
import FoodPicturesCreatePost from "./components/foodPictures/foodPicturesCreatePost";
import FeaturedPostCarousel from "./components/foodPictures/featuredPostCarousel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
class App extends React.Component {
  render() {
    return (
      <div className={"App"}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/ingredientInventory" component={IngredientInventory} />
          <Route path="/recommendation" component={Recommendation} />
          <Route path="/journal" component={Journal} />
          <Route path="/journalView" component={JournalView} />
          <Route path="/foodPicAllView" component={FoodPictures} />
          <Route path="/foodPicNewPost" component={FoodPicturesCreatePost} />
          <Route path="/foodPicFeatured" component={FeaturedPostCarousel} />
        </Switch>
      </div>
    );
  }
}
export default App;
