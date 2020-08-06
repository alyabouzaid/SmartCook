import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Source from: https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: [
        "colorStore"
    ]

};

const pReducer = persistReducer(persistConfig, reducers);

export const store = createStore(pReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
