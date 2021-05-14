import axios from "../../axios";
import { AuthActionType } from "../actions/AuthAction";

const authState = {
  isLoggedIn: false,
  user: {
    fullname: "",
    email: "",
    password: "",
    ava: "",
    jwttoken: "",
    expires_at: "",
  },
};
const getAuthState = () => {
  const auth = localStorage.getItem("auth");
  try {
    const authobj = JSON.parse(auth);
    console.log("norma2: ", authobj);
    const { jwtToken } = authobj.user;
    // if (new Date(expires_at) > new Date()) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`;

    console.log("norma: ", jwtToken);
    return authobj;
    // }
    // return authState;
  } catch (error) {
    return authState;
  }
};
console.log(getAuthState());
const newAuth = getAuthState();
console.log("new Auth: ", newAuth);
const authreducer = (state = newAuth, action) => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
      const newAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `Bearer ${action.payload.jwttoken}`;
      localStorage.setItem("auth", JSON.stringify(newAuthState));
      return newAuthState;

    case AuthActionType.LOGOUT_SUCCESS:
      localStorage.removeItem("auth");
      localStorage.removeItem("timeJWT");
      // localStorage.removeItem("currentPage");
      return authState;

    case AuthActionType.LOGIN_SUCCESS:
      const loginAuthState = {
        isLoggedIn: true,
        user: action.payload,
        expires_at: "its time",
      };
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.jwttoken}`;
      localStorage.setItem("auth", JSON.stringify(loginAuthState));
      // localStorage.setItem("currentPage", '');
      localStorage.setItem("timeJWT", Date.now());
      return loginAuthState;

    default:
      return state;
  }
};

export default authreducer;
