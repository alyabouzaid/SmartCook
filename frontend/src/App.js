import React from 'react';
import './App.css';
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from './components/ingredientInventory/IngredientInventory';
import LogIn from './components/login/LogIn';
import SignUp from './components/login/SignUp';
import {Route, Switch } from "react-router-dom";


class App extends React.Component {

    render() {
        return(
                <div className={"App"}>

                    <Switch>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/ingredientInventory" component={IngredientInventory} />
                        <Route path="/logIn" component={LogIn} />
                        <Route path="/recommendation" component={Recommendation} />
                        <Route path="/signUp" component={SignUp} />
                    </Switch>

                </div>
        )
    }
}

export default App;

