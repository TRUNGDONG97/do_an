import {
  GET_LIST_ABSENT,
  GET_LIST_CLASS,
  GET_LIST_NOTIFICATION,
  GET_LIST_FEE,
  GET_USER_INFOR,
  UPDATE_USER,
  GET_CLASS,
  GET_DETAIL_CLASS,
  GET_LIST_TIMEKEEPING
} from "./type";

export const getUserInfo = () => ({
  type: GET_USER_INFOR,
  payload: {}
});

// export const getListAbsentAction = (month, classID, className, typeLoading) => ({
//   type: GET_LIST_ABSENT,
//   payload: {
//     Month: month,
//     ClassID: classID,
//     ClassName: className
//   },
//   typeLoading: typeLoading
// });

export const getListNotifyAction = () => ({
  type: GET_LIST_NOTIFICATION,
  payload: {}
});

export const updateUser = payload => ({
  type: UPDATE_USER,
  payload: payload
});
export const getListAbsent = () => ({
  type: GET_LIST_ABSENT,
  payload: {}
});
export const getListTimekeeping = (startDate, endDate) => ({
  type: GET_LIST_TIMEKEEPING,
  payload: {
    startDate,
    endDate
  }
});
