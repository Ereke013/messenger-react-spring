import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { LoginAuthAction } from "../../redux/actions/AuthAction";
import "./Login.css";
import ErrorHandler from "../error/ErrorHandler";
import {FormControl, FormHelperText, Input, InputLabel} from '@material-ui/core';


function Login(props) {
  // const { user, login } = props;
  // const [loginState, setLoginState] = useState({});
  const { login } = props;

  const [errorHandler, setErrorHandler] = useState({
    hasError: false,
    message: "",
  });

  const [loginState, setLoginState] = useState({});
  const history = useHistory();
  return (
    <div>
      <div className="login">
        <div className="container d-flex">

          <div className="sign-in-container py-5 m-auto border logiin">

            <div className="sign-in-header">
              <ErrorHandler
                  errorHandler={errorHandler || { hasError: false, message: "" }}
              />
              <h4 className="font-weight-bold">Login</h4>
              <p className="sign-in-intro">
                <span className="text-muted">New to In App ? </span>
                <Link to="/register">
                  <span className="text-danger font-weight-bold">Sign Up</span>
                </Link>
              </p>
              {/* <div className="login-social-media py-3">
                <button className="btn btn-primary btn-block btn-sm">
                  Continue with Google
                </button>
              </div> */}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                login(loginState, history, setErrorHandler);
              }}
            >
              <div className="form-group">
                <FormControl style={{width:"100%"}}>
                  <InputLabel htmlFor="my-input">Email address</InputLabel>
                  <Input type="email" id="my-input" aria-describedby="my-helper-text"  onChange={(event) => {
                    const email = event.target.value;
                    setLoginState({ ...loginState, ...{ email } });
                  }} required={true}/>
                  {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                </FormControl>
                {/*<label htmlFor="InputEmail">Email address</label>*/}
                {/*<input*/}
                {/*  type="email"*/}
                {/*  className="form-control form-control-sm"*/}
                {/*  onChange={(event) => {*/}
                {/*    const email = event.target.value;*/}
                {/*    setLoginState({ ...loginState, ...{ email } });*/}
                {/*  }}*/}
                {/*/>*/}
                {/* <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small> */}
              </div>
              <div className="form-group">
                <FormControl style={{width:"100%"}}>
                  <InputLabel htmlFor="my-input">Password</InputLabel>
                  <Input type="password" id="my-input" aria-describedby="my-helper-text"
                         onChange={(event) => {
                           const password = event.target.value;
                           setLoginState({ ...loginState, ...{ password } });
                         }}
                         required={true}/>
                  {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                </FormControl>
                {/*<label htmlFor="InputPassword1">Password</label>*/}
                {/*<input*/}
                {/*  type="password"*/}
                {/*  className="form-control form-control-sm"*/}
                {/*  onChange={(event) => {*/}
                {/*    const password = event.target.value;*/}
                {/*    setLoginState({ ...loginState, ...{ password } });*/}
                {/*  }}*/}
                {/*/>*/}
              </div>
              <button type="submit" className="btn btn-primary btn-sm">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (loginState, history, setErrorHandler) => {
      dispatch(LoginAuthAction(loginState, history, setErrorHandler));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
