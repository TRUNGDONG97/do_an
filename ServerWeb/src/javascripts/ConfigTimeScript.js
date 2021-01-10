$(document).ready(function () {
  $("#tabConfigTime a").css({ "background-color": "#fff", color: "#f02a2a" });
  // searchEmployee(1);
  // $("#btnSearchEmployee").click(function () {
  //   searchEmployee(1);
  // });

  getConfigTime();
});
const getConfigTime = () => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  $.ajax({
    url: "/getConfigTime",
    type: "GET",
    dataType: "json",
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      $("#max_time_late").val(res.max_time_late);
      if (res.result == 0) {
        swal({
          title: "Chưa có dữ liệu",
          text: "",
          dangerMode: true,
          icon: "warning",
        });
        return;
      }
      $("#time_start_work_morning").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_start_work_morning
          ? res.time_start_work_morning
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_start_checkin_morning").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_start_checkin_morning
          ? res.time_start_checkin_morning
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_end_checkin_morning").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_end_checkin_morning
          ? res.time_end_checkin_morning
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_start_checkout_morning").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_start_checkout_morning
          ? res.time_start_checkout_morning
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_end_checkout_morning").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_end_checkout_morning
          ? res.time_end_checkout_morning
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      //chiều
      $("#time_start_work_afternoon").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_start_work_afternoon
          ? res.time_start_work_afternoon
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_start_checkin_afternoon").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_start_checkin_afternoon
          ? res.time_start_checkin_afternoon
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_end_checkin_afternoon").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_end_checkin_afternoon
          ? res.time_end_checkin_afternoon
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_start_checkout_afternoon").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_start_checkout_afternoon
          ? res.time_start_checkout_afternoon
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
      $("#time_end_checkout_afternoon").timepicker({
        timeFormat: "h:mm p",
        interval: 15,
        defaultTime: !!res.time_end_checkout_afternoon
          ? res.time_end_checkout_afternoon
          : "7:30",
        dropdown: true,
        scrollbar: true,
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // If fail
      swal({
        title: "Đã có lỗi xảy ra",
        text: "",
        dangerMode: true,
        icon: "warning",
      });
      console.log(textStatus + ": " + errorThrown);
      return;
    });
};

const updateTimeConfig = () => {
  // check internet
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  //lấy dữ liệu từ view
  var max_time_late = $.trim($("#max_time_late").val());
  var time_start_work_morning = $.trim($("#time_start_work_morning").val());

  var time_start_checkin_morning = $.trim(
    $("#time_start_checkin_morning").val()
  );
  var time_end_checkin_morning = $.trim($("#time_end_checkin_morning").val());
  var time_start_checkout_morning = $.trim(
    $("#time_start_checkout_morning").val()
  );

  var time_end_checkout_morning = $.trim($("#time_end_checkout_morning").val());

  var time_start_work_afternoon = $.trim($("#time_start_work_afternoon").val());

  var time_start_checkin_afternoon = $.trim(
    $("#time_start_checkin_afternoon").val()
  );
  var time_end_checkin_afternoon = $.trim(
    $("#time_end_checkin_afternoon").val()
  );
  var time_start_checkout_afternoon = $.trim(
    $("#time_start_checkout_afternoon").val()
  );
  var time_end_checkout_afternoon = $.trim(
    $("#time_end_checkout_afternoon").val()
  );
  console.log(
    "time_start_work_morning",
    converTimeToMinute(time_end_checkout_afternoon)
  );
  time_start_work_morning = converTimeToMinute(time_start_work_morning);
  time_start_checkin_morning = converTimeToMinute(time_start_checkin_morning);
  time_end_checkin_morning = converTimeToMinute(time_end_checkin_morning);
  time_start_checkout_morning = converTimeToMinute(time_start_checkout_morning);
  time_end_checkout_morning = converTimeToMinute(time_end_checkout_morning);
  time_start_work_afternoon = converTimeToMinute(time_start_work_afternoon);
  time_start_checkin_afternoon = converTimeToMinute(
    time_start_checkin_afternoon
  );
  time_end_checkin_afternoon = converTimeToMinute(time_end_checkin_afternoon);
  time_start_checkout_afternoon = converTimeToMinute(
    time_start_checkout_afternoon
  );
  time_end_checkout_afternoon = converTimeToMinute(time_end_checkout_afternoon);

  // giaotiep vs server
  $.ajax({
    url: "/updateTimeConfig",
    type: "POST",
    data: {
      max_time_late,
      time_start_work_morning,
      time_start_checkin_morning,
      time_end_checkin_morning,
      time_start_checkout_morning,
      time_end_checkout_morning,
      time_start_work_afternoon,
      time_start_checkin_afternoon,
      time_end_checkin_afternoon,
      time_start_checkout_afternoon,
      time_end_checkout_afternoon,
    },
    cache: false,
    timeout: 50000,
    beforeSend: function () {
      $("#modalLoad").modal("show");
    },
  })
    .done(function (res) {
      // thành công 
      console.log("res", res);
      $("#modalLoad").modal("hide");
      //   getConfigTime();
      swal({
        title: "Cập nhật thành công",
        text: "",
        icon: "success",
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      //thất bại
      $("#modalLoad").modal("hide");
      swal({
        title: "Đã có lỗi xảy ra",
        text: "",
        icon: "warning",
        dangerMode: true,
      });
      // console.log(textStatus + ': ' + errorThrown);
      return;
    });
};
const converTimeToMinute = (time) => {
  var p = time.slice(time.length - 2, time.length);
  var minute = time.slice(time.length - 5, time.length - 3);
  var hour = time.slice(0, time.length - 6);
  //   console.log("p", p);
  //   console.log("minute", minute);
  //   console.log("hour", hour);
  if (p == "AM") {
    return parseInt(minute) + parseInt(hour) * 60;
  }
  if (p == "PM") {
    return parseInt(minute) + parseInt(hour) * 60 + 12 * 60;
  }
};
