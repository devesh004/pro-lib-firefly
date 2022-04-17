import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReudcer from "../redux/reducers";

const userFromLocal = localStorage.getItem("pf-user")
  ? JSON.parse(localStorage.getItem("pf-user"))
  : null;
const tokenFromLocal = localStorage.getItem("pf-token")
  ? JSON.parse(localStorage.getItem("pf-token"))
  : null;

const initialState = {
  auth: {
    user: userFromLocal,
    accessToken: tokenFromLocal,
  },
};

const middleware = [thunk];

const store = createStore(
  rootReudcer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
