import {
  watchLogin,
  watchListAbsent,
  watchGetListNotify,
  watchGetUserInfo,
  watchUpdateUser,
  watchGetListTimekeeping
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchLogin
  yield watchListAbsent
  yield watchGetListNotify
  yield watchGetUserInfo
  yield watchUpdateUser
  yield watchGetListTimekeeping
}