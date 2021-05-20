import { Avatar } from "@material-ui/core";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import eeImg from "../../images/phone.png";
import { LogOutAuthAction } from "../../redux/actions/AuthAction";
import "./Header.css";
import axios from "../../axios";

function Header(props) {
  const { auth, logout, errorHandler } = props;
  const history = useHistory();
  console.log(auth.user.roles);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(()=>{
    async function fetchData(){
      const request = await axios.get("/api/allUsers/"+auth?.user.id);
      setCurrentUser(request.data);
      console.log("requestheaders");
      console.log(request.data);
    }
    fetchData();
  },[]);
  return (
    <div className="headerr">
      <nav className="navbar navbar-expand-lg navbar-dark nav_bg_color ">
        <div className="container">
          <Link className="navbar-brand font-weight-bold stick" to="/">
            Messenger
          </Link>

          <ul className="navbar-nav mr-auto"></ul>
          <div className="form-inline my-2 my-lg-0">
            <ul className="navbar-nav mr-auto">
              {!auth.isLoggedIn ? (
                // <ul className="navbar-nav">
                <>
                  <li className="nav-item active">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item active">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                // </ul>
                <>
                  {/* <ul className="navbar-nav"> */}
                  {auth?.user?.roles?.find(o => o.role === 'ROLE_ADMIN')?
                      (<li className="nav-item active">

                        <Link className="nav-link d-flex" to="/admin">
                          Admin Page
                          {/* <span className="sr-only">(current)</span> */}
                        </Link>
                      </li>):''}

                  <li className="nav-item active">
                    <Link className="nav-link d-flex" to="/profile">
                      {auth.user.fullName}
                      {/* <span className="sr-only">(current)</span> */}
                    </Link>
                  </li>
                  <li className="nav-item active">
                    <div
                      className="nav-link"
                      onClick={() => {
                        logout();
                      }}
                    >
                      <p>
                        Logout <span className="sr-only">(current)</span>
                      </p>
                    </div>
                  </li>
                  {/* </ul> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.authState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (history) => {
      dispatch(LogOutAuthAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
