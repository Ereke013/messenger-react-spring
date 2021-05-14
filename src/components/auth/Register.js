import axios from "../../axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {Link, Redirect} from "react-router-dom";
import { RegisterAuthAction } from "../../redux/actions/AuthAction";
import "./Register.css";
import requests from "../../request";

function Register(props) {
  const { user, register } = props;
  const [userState, setUserstate] = useState({});
  const history = useHistory();

  const [errorHandler, setErrorHandler] = useState({
    hasError: false,
    message: "",
  });

  return (
    <div>
      <div className="register">
        <div className="container d-flex">
          <div className="sign-in-container py-5 m-auto border registeer">
            <div className="sign-in-header">
              <h4 className="font-weight-bold">Sign Up</h4>
              <p className="sign-in-intro">
                <span className="text-muted">
                  Already exist account In Our App ?{" "}
                </span>
                <Link to="/login">
                  <span className="text-danger font-weight-bold">Sign In</span>{" "}
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
                const userRegister = {
                  email: userState.email,
                  fullName: userState.name,
                  password: userState.password,
                  // ava: userState.ava,
                };
                console.log("after, .....", userRegister);
                axios.post(requests.register, userRegister);
                console.log("before, .....", userRegister);
                history.push("/login");
                // register(userRegister, history, setErrorHandler);
              }}
            >
              <div className="form-group">
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="InputEmail">Name</label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Name"
                      onChange={(event) => {
                        const name = event.target.value;
                        setUserstate({ ...userState, ...{ name } });
                      }}
                    />
                  </div>
                </div>
              </div>
              {/*<div className="form-group">*/}
              {/*  <label htmlFor="InputAva">Ava Picture(in URL)</label>*/}
              {/*  <input*/}
              {/*    type="text"*/}
              {/*    className="form-control form-control-sm"*/}
              {/*    placeholder="Ava Picture(in URL)"*/}
              {/*    onChange={(event) => {*/}
              {/*      const ava = event.target.value;*/}
              {/*      setUserstate({ ...userState, ...{ ava } });*/}
              {/*    }}*/}
              {/*  />*/}
              {/*  /!* <small id="emailHelp" className="form-text text-muted">*/}
              {/*    We'll never share your email with anyone else.*/}
              {/*  </small> *!/*/}
              {/*</div>*/}
              <div className="form-group">
                <label htmlFor="InputEmail">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  onChange={(event) => {
                    const email = event.target.value;
                    setUserstate({ ...userState, ...{ email } });
                  }}
                />
                {/* <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small> */}
              </div>
              <div className="form-group">
                <label htmlFor="InputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control form-control-sm"
                  onChange={(event) => {
                    const password = event.target.value;
                    setUserstate({ ...userState, ...{ password } });
                  }}
                />
              </div>
              <button type="submit" className="btn btn-success btn-sm">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   console.log("mapState");
//   return {
//     user: state,
//   };
// };
//
// const mapDispatchToProps = (dispatch) => {
//   console.log("mapDispatch");
//   return {
//     register: (userState, history, setErrorHandler) => {
//       console.log("userState is: ", userState);
//       dispatch(RegisterAuthAction(userState, history, setErrorHandler));
//     },
//   };
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(Register);

export default Register;
