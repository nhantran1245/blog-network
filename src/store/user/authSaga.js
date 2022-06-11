import { put } from "redux-saga/effects";
import { authAction, setUser } from "./authSlice";
import { takeEvery, call } from "redux-saga/effects";
import { loginApi, fetchCurrentUser } from "./authApi";
import { push } from "connected-react-router";

function* handleLogin(action) {
  try {
    const response = yield call(loginApi, action.payload);
    localStorage.setItem("access-token", response.jwtToken);
    yield put(authAction.loginSuccess());
    yield put({ type: "FETCH_USER" });
    yield put(push("/"));
  } catch (e) {
    yield put(authAction.loginFail());
  }
}

function* handleLogout() {
  localStorage.removeItem("access-token");
  yield put(authAction.logout);
  yield put(push("/login"));
}

function* getCurrentUserInformation() {
  try {
    const { user: currentUser } = yield call(fetchCurrentUser);
    yield put(setUser(currentUser));
  } catch {
    return;
  }
}
export function* authSaga() {
  yield takeEvery("USER_LOGIN", handleLogin);
  yield takeEvery("USER_LOGOUT", handleLogout);
  yield takeEvery("FETCH_USER", getCurrentUserInformation);
}
