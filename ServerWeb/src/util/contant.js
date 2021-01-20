const OPTION = {
  maxAge: 1000 * 60 * 10, // would expire after 10 minutes
  httpOnly: true, // The cookie only accessible by the web server
  signed: true,
};
const PER_PAGE = 10; 
const PAGE_SIZE = 10;

const TIME_ABSENT = 5;
const TYPE_NOTIFICATION = {
  ABSENT_CLASS_END: 1,
  CANCEL_ABSENT: 2,
  ABSENT_STUDENT: 3,
};
const DISTANCE = 250;

const TIME_WORKING = {
  TIME_START_WORKING_MORNING: 8 * 60 + 30, //thởi gian bắt đầu làm việc vào buổi sáng 8:30
  // TIME_END_WORKING_MORNING:12*60,//thởi gian kết thúc làm việc vào buổi sáng 12:00
  TIME_START_WORKING_AFTERNOON: 23 * 60 + 30, //thởi gian bắt đầu làm việc vào buổi chiều 13:30
  // TIME_END_WORKING_AFTERNOOM:17*60+30,//thởi gian kết thúc làm việc vào buổi chiều 17:30
};
const TIMEKEEPING = {
  TIME_START_CHECKIN_MORNING: 6 * 60, //thời gian bắt đầu checkin  buổi sáng 6h
  TIME_END_CHECKIN_MORNING: 9 * 60, //thời gian kết thúc checkin  buổi sáng 9h
  TIME_START_CHECKOUT_MORNING: 12 * 60, //thời gian bắt đầu checkout  buổi sáng 12h
  TIME_END_CHECKOUT_MORNING: 13 * 60 + 30, //thời gian kết checkout  buổi sáng 13:30

  TIME_START_CHECKIN_AFTERNOON: 12 * 60, //thời gian bắt đầu checkin  buổi CHIỀU 12h
  TIME_END_CHECKIN_AFTERNOON: 14 * 60, //thời gian kết thúc checkin  buổi CHIỀU 14h
  TIME_START_CHECKOUT_AFTERNOON: 17 * 60, //thời gian bắt đầu checkout  buổi CHIỀU 17h
  TIME_END_CHECKOUT_AFTERNOON: 23 * 60 + 59, //thời gian kết checkout  buổi CHIỀU 24:00
};
const COEFFICIENT = {
  LEADER: 5,
  EMPLOYEE: 1,
};
export default {
  OPTION,
  PER_PAGE,
  PAGE_SIZE,
  TIME_ABSENT,
  TYPE_NOTIFICATION,
  DISTANCE,
  TIMEKEEPING,
  TIME_WORKING,
};
