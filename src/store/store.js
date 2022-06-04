import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user/authSlice";
import blogSlice from "./blog/blogSlice";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
// import { routerMiddleware, routerReducer } from "react-router-redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import history from "../utils/history";


const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userSlice,
  blog: blogSlice,
});
const sagaMiddleWare = createSagaMiddleware();
export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(sagaMiddleWare, routerMiddleware(history)),
});

sagaMiddleWare.run(rootSaga);
