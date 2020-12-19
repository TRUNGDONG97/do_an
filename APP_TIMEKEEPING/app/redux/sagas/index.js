import {
  watchLogin,
  watchListAbsent,
  watchGetListNotify,
  watchGetUserInfo,
  watchUpdateUser,
  // watchGetDetailClass
} from './NetworkSaga'


export default function* rootSaga() {
  yield watchLogin
  yield watchListAbsent
  yield watchGetListNotify
  yield watchGetUserInfo
  yield watchUpdateUser
  // yield watchGetDetailClass
}