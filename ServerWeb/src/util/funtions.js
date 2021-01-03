import Constants from "./contant";
import request from "request";
// import distance from 'google-distance'
module.exports.getArrayPages = function (req) {
  return function (pageCount, currentPage) {
    const currP = parseInt(currentPage);
    const pageC = parseInt(pageCount);
    const pageSize = parseInt(Constants.PAGE_SIZE);
    const prev = currP - 1;
    const next = currP + 1;
    var pages = [];
    if (pageC <= pageSize) {
      for (var i = 1; i <= pageC; i++) {
        pages.push(i);
      }
    } else if (currP <= 2) {
      for (var i = 1; i <= pageSize; i++) {
        pages.push(i);
      }
    } else if (currP > pageC + 2 - pageSize) {
      for (var i = pageC - pageSize + 1; i <= pageC; i++) {
        pages.push(i);
      }
    } else {
      for (var i = currP - 1; i <= currP + pageSize - 2; i++) {
        pages.push(i);
      }
    }
    return {
      prev: prev,
      next: next,
      pages: pages,
    };
  };
};
module.exports.PageCount = function (count) {
  return count % Constants.PER_PAGE == 0
    ? Math.floor(count / Constants.PER_PAGE)
    : Math.floor(count / Constants.PER_PAGE) + 1;
};
module.exports.pushNotification = (device, message, data) => {
  var restKey = "OTllOWM0ODYtMDhmMC00MjkxLTkxN2MtODNmNjkzN2YyYjBi";
  var appID = "a3a7b8e7-3607-4ed1-9066-3a8e98e9ce86";
  request(
    {
      method: "POST",
      uri: "https://onesignal.com/api/v1/notifications",
      headers: {
        authorization: "Basic " + restKey,
        "content-type": "application/json",
      },
      json: true,
      body: {
        app_id: appID,
        contents: { en: message },
        include_player_ids: Array.isArray(device) ? device : [device],
        data: data,
        headings: { en: "Notification" },
      },
    },
    function (error, response, body) {
      if (!body.errors) {
        console.log(body);
      } else {
        console.error("Error:", body.errors);
      }
    }
  );
};



module.exports.readFileExel = (fileUpload) => {
  var arrStudent = [];
  if (typeof FileReader != "undefined") {
    var reader = new FileReader();

    reader.onload = function (e) {
      var binary = "";
      var bytes = new Uint8Array(e.target.result);
      var length = bytes.byteLength;
      for (var i = 0; i < length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      // call 'xlsx' to read the file
      var workbook = XLSX.read(binary, {
        type: "binary",
        cellDates: true,
        cellStyles: true,
      });
      var firstSheet = workbook.SheetNames[0];
      arrStudent = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[firstSheet]
      );
      console.log(arrStudent);
    };
    reader.readAsArrayBuffer(fileUpload);
  }
  return arrStudent;
};

module.exports.checkTimeCheckinMorning = (time) => {
  //time đơn vị phút
  if (
    time >= Constants.TIMEKEEPING.TIME_START_CHECKIN_MORNING &&
    time <= Constants.TIMEKEEPING.TIME_END_CHECKIN_MORNING
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports.checkTimeCheckoutMorning = (time) => {
  //time đơn vị phút

  if (
    time >= Constants.TIMEKEEPING.TIME_START_CHECKOUT_MORNING &&
    time <= Constants.TIMEKEEPING.TIME_END_CHECKOUT_MORNING
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports.checkTimeCheckinAfternoon = (time) => {
  //time đơn vị phút
  if (
    time >= Constants.TIMEKEEPING.TIME_START_CHECKIN_AFTERNOON &&
    time <= Constants.TIMEKEEPING.TIME_END_CHECKIN_AFTERNOON
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports.checkTimeCheckoutAfternoon = (time) => {
  //time đơn vị phút
  if (
    time >= Constants.TIMEKEEPING.TIME_START_CHECKOUT_AFTERNOON &&
    time <= Constants.TIMEKEEPING.TIME_END_CHECKOUT_AFTERNOON
  ) {
    return true;
  } else {
    return false;
  }
};
//trả về đơn vị phut
module.exports.getCurrentTime = () => {
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  return hour * 60 + minute;
};
module.exports.getCurrentDate = () => {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dates = date.getDate();
  return year + "-" + month + "-" + dates;
};
module.exports.converMinuteToTime = (time) => {
  var minute=time%60
  if(minute.toString().length==1){
    minute=  "0"+minute.toString()
  }
  // console.log("Dsda", Math.floor(time / 60) + ":" + minute);
  return Math.floor(time / 60) + ":" + minute;
};