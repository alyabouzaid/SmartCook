import React from 'react';
import './App.css';
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from './components/ingredientInventory/IngredientInventory';
import {Route, Switch } from "react-router-dom";
import Journal from "./components/journal/journal";


class App extends React.Component {

    render() {
        return(
                <div className={"App"}>

                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/ingredientInventory" component={IngredientInventory} />
                        <Route path="/recommendation" component={Recommendation} />
                        <Route path="/journal" component={Journal} />
                    </Switch>

                </div>
        )
    }
}

export default App;

