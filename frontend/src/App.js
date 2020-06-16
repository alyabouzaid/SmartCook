import React from 'react';
import './App.css';
import Recommendation from "./components/recipe/recommendation";
import LandingPage from "./components/landingPage/landingPage";
import Header from "./components/landingPage/Header";
import IngredientInventory from './components/ingredientInventory/IngredientInventory';
import LogIn from './components/login/LogIn';
import SignUp from './components/login/SignUp';




function App() {
  return (
    <div className="App">
       <LandingPage/>
       <Recommendation />
       <IngredientInventory/>
       <LogIn/>
       <SignUp/>
    </div>
  );
}

export default App;
