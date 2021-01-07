import { put, takeEvery, call } from "redux-saga/effects";

import {
  GET_LIST_ABSENT_SUCCESS,
  GET_LIST_ABSENT_FAIL,
  GET_LIST_ABSENT,
  GET_LIST_CLASS_SUCCESS,
  GET_LIST_CLASS_FAIL,
  GET_LIST_CLASS,
  GET_LIST_NOTIFICATION_SUCCESS,
  GET_LIST_NOTIFICATION_FAIL,
  GET_LIST_NOTIFICATION,
  GET_LIST_FEE,
  GET_LIST_FEE_SUCCESS,
  GET_LIST_FEE_FAIL,
  GET_USER_INFOR_SUCCESS,
  GET_USER_INFOR_FAIL,
  GET_USER_INFOR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER,
  GET_DETAIL_CLASS,
  GET_DETAIL_CLASS_SUCCESS,
  GET_DETAIL_CLASS_FAIL,
  GET_LIST_TIMEKEEPING,
  GET_LIST_TIMEKEEPING_SUCCESS,
  GET_LIST_TIMEKEEPING_FAIL
} from "../actions/type";
import Toast, { BACKGROUND_TOAST } from "@app/utils/Toast";
import * as API from "../../constants/Api";
import reactotron from "reactotron-react-native";

export function* getListAbsent(action) {
  try {
    const response = yield call(API.getListAbsent);
    yield put({ type: GET_LIST_ABSENT_SUCCESS, payload: response.data });
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_ABSENT_FAIL, payload: err });
    // alert(err)
  }
}

export function* getListNotify() {
  try {
    const response = yield call(API.getListNotification);
    yield put({ type: GET_LIST_NOTIFICATION_SUCCESS, payload: response.data });
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_NOTIFICATION_FAIL, payload: err });
    // alert(err)
  }
}

export function* getUserInfo() {
  try {
    const response = yield call(API.getUserInfo);
    // reactotron.log(response)
    yield put({ type: GET_USER_INFOR_SUCCESS, payload: response.data });
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_USER_INFOR_FAIL, payload: err });
    // alert(err)
  }
}

export function* updateUser(action) {
  try {
    const response = yield call(API.updateUser, action.payload);
    yield put({ type: UPDATE_USER_SUCCESS, payload: response.data });
    Toast.show("Cập nhật thông tin thành công", BACKGROUND_TOAST.SUCCESS);
  } catch (err) {
    yield put({ type: UPDATE_USER_FAIL, payload: err });
    if (err.message == "Network Error") {
      Toast.show("Cập nhật thông tin thất bại", BACKGROUND_TOAST.FAIL);
    }
  }
}
export function* getListTimekeeping(action) {
  try {
    const response = yield call(API.getListTimekeeping, action.payload);
    // reactotron.log(response)
    yield put({ type: GET_LIST_TIMEKEEPING_SUCCESS, payload: response.data });
    // alert(JSON.stringify(response))
  } catch (err) {
    yield put({ type: GET_LIST_TIMEKEEPING_FAIL, payload: err });
    // alert(err)
  }
}
export const watchListAbsent = takeEvery(GET_LIST_ABSENT, getListAbsent);
export const watchGetListNotify = takeEvery(
  GET_LIST_NOTIFICATION,
  getListNotify
);
export const watchGetUserInfo = takeEvery(GET_USER_INFOR, getUserInfo);
export const watchUpdateUser = takeEvery(UPDATE_USER, updateUser);
export const watchGetListTimekeeping = takeEvery(
  GET_LIST_TIMEKEEPING,
  getListTimekeeping
);
