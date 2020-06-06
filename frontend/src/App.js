import React from 'react';
// import logo from '../logo.svg';
import './App.css';
import IngredientInventory from './components/ingredientInventory/IngredientInventory';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
        <div><IngredientInventory/></div>
        </div>
      </header>
    </div>
  );
}


export default App;
