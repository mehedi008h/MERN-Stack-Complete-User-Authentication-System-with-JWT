import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  authReducer,
  userReducer,
} from "./reduceres/userReduceres";

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  allUsers: allUsersReducer,
});

const middlware = [thunk];
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
