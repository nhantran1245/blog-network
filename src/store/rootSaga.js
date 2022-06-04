import { all } from "redux-saga/effects";
import { authSaga } from "./user/authSaga";
import { blogSaga } from "./blog/blogSaga";
export default function* rootSaga() {
  yield all([authSaga(), blogSaga()]);
}
