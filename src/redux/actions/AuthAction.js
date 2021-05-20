import axios from "../../axios";
import requests from "../../request";
import {Redirect} from "react-router-dom";

const AuthActionType = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAIL: "LOGOUT_FAIL",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_FAIL: "UPDATE_PROFILE_FAIL"
};

const RegisterAuthAction = (userState, history, setErrorHandler) => {
  console.log("user in auth action: ", userState);
  return async (dispatch) => {
    try {
      console.log("user in auth action2: ", userState);
      const res = await axios.post(requests.register, userState);
      const { data } = res;
      console.log("I am here11")
      dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
      console.log("I am here")
      return(<Redirect push to="/login" />);

      // history.push("/login");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.REGISTER_FAIL,
          payload: error.response.data.message,
        });
        setErrorHandler({
          hasError: true,
          message: error.response.data.message,
        });
      }
    }
  };
};

const LoginAuthAction = (loginState, history, setErrorHandler) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(requests.auth, loginState);
      const { data } = res;
      dispatch({ type: AuthActionType.LOGIN_SUCCESS, payload: data });
      history.push("/home");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.LOGIN_FAIL,
          payload: error.response.data.message,
        });
      }
      setErrorHandler({ hasError: true, message: error.response.data.message });
    }
  };
};

const LogOutAuthAction = (history) => {
  return async (dispatch) => {
    try {
      // const res = await axios.get("/logout");
      // const { data } = res;
      dispatch({
        type: AuthActionType.LOGOUT_SUCCESS,
        // payload: data.message,
      });
      history.push("/");
    } catch (error) {
      if (error.response) {
        dispatch({
          type: AuthActionType.LOGOUT_FAIL,
          payload: error.response.data.message,
        });
      }
    }
  };
};

const updateNameAuthAction = (updateUserState) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(requests.updateUser, updateUserState);

      // const jwtToken = res.data.jwtToken;
      // axios.defaults.headers.common["Authentication"] = `Bearer ${jwtToken}`;
      // const profileRes = axios.get(requests.profile);
      const data = res.data;
      console.log(data);
      const updatedProfile = {email:data.email,
        fullName:data.fullName,

        ava:data.ava};
      console.log("HERE", updatedProfile);

      dispatch({
        type: AuthActionType.UPDATE_PROFILE_SUCCESS,
        payload:  updatedProfile ,
      });
      // history.push("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: AuthActionType.UPDATE_PROFILE_FAIL, payload: {} });
    }
  };
};

export {
  RegisterAuthAction,
  AuthActionType,
  LogOutAuthAction,
  LoginAuthAction,
  updateNameAuthAction
};
