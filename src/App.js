import "./App.css";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from "react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import HomePage from "./components/pages/HomePage";
import AdminPage from "./components/admin/AdminPage";

function App(props) {
  const { auth } = props;
  return (
    <div>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            {!auth.isLoggedIn ? <Welcome /> : <Redirect to="/home" />}
          </Route>
          <Route  path="/login">
            <Login></Login>
          </Route>
          <Route  path="/register">
            <Register></Register>
          </Route>
          <Route path="/home">
            {!auth.isLoggedIn ? (
              // <h1 style={{ backgroundColor: "white", margin: "5% 10%" }}>
              //   404 NOT FOUND
              // </h1>
              <Redirect push to="/" />
            ) : (
              <HomePage />

            )}
          </Route>

          <Route path="/profile">
            {!auth.isLoggedIn ? (
                // <h1 style={{ backgroundColor: "white", margin: "5% 10%" }}>
                //   404 NOT FOUND
                // </h1>
                <Redirect push to="/" />
            ) : (
                <Redirect push to="/home/profile" />
                // <Profile />
            )}
          </Route>

          <Route path="/admin">
            {!auth.isLoggedIn ? (
                <Redirect push to="/" />
            ) : (
                <AdminPage />
            )}

          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};
export default connect(mapStateToProps)(App);
// export default App;
