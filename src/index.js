import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";
import { Provider } from "react-redux";
import axios from "axios";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { syncHistoryWithStore } from "react-router-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(thunk))
// ); /*Метод composeWithDevTools это улучшеный метод compose, который автоматически добавляет devtools к всему,
//   что мы передали ему внутрь. Внутри мы вызываем applyMiddleware,
//   которая принимает в качесте аргументов middleware и применяет их.
//   То есть теперь если мы захотим добавить еще какую-то middleware, мы просто добавим ее через запятую*/

// const history = syncHistoryWithStore(createBrowserHistory(), store);

// axios.defaults.baseURL = "http://localhost:8080/api/v1";

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
        {/*{window.onload=()=>{*/}
        {/*    if(localStorage.getItem("auth")===true){*/}
        {/*        localStorage.removeItem("auth");*/}
        {/*    }*/}
        {/*}}*/}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
