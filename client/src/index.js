import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LandingPage from "./components/landingPage/landingPage";
import IngredientInventory from "./components/ingredientInventory/IngredientInventory";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import { BrowserRouter} from "react-router-dom";
import thunk from 'redux-thunk';



ReactDOM.render(
    <BrowserRouter>
  <Provider store={createStore(reducers, applyMiddleware(thunk))}>
    <App />
  </Provider>
    </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
