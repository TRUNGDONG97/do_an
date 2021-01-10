$(document).ready(function () {
  $("#tabTimekeeping a").css({ "background-color": "#fff", color: "#f02a2a" });
  $(".datepicker").datepicker({
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom auto",
  });
  $("#date").datepicker("setDate", new Date());
  searchTimekeeping(1);
  //   clickCheckAll();
  $(document).on("change", "#checkAll", function () {
    console.log("Dsadsadsa", this.checked);
    var check = this.checked;
    $(".notConfirm").each(function () {
      // console.log(this);
      $(this).prop("checked", check);
    });
  });
});

const searchTimekeeping = (currentPage) => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  var date = new Date();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var date1 = date.getDate();
  var nameEmployee = $.trim($("#txtNameEmployee").val());
  var employee_code = $.trim($("#txtCodeEmployee").val());
  var date = $.trim($("#date").val());

  if (!date) {
    date = year + "-" + month + "-" + date1;
  }
  $.ajax({
    url: "/seacherListTimekeepingDay",
    type: "POST",
    data: { currentPage, nameEmployee, employee_code, date },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      // console.log(res);
      $("#tableTimekeeping").html(res.htmlTable);
      return;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // If fail
      swal({
        title: "Đã có lỗi xảy ra",
        text: "",
        icon: "warning",
        dangerMode: true,
      });
      console.log(textStatus + ": " + errorThrown);
      return;
    });
};
const confirmTimekeeping = () => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  let arrId = [];
  $(".notConfirm").each(function () {
    // console.log(this);
    // console.log("$(this).prop();",$(this).prop("checked") )
    if( $(this).prop("checked")){
        let timekeeping=JSON.parse($(this).prop("value"))
        // console.log("timekeeping",timekeeping.id);
        arrId.push(timekeeping.id)
    }
  });
  if(arrId.length<1){
    swal({
      title: "Bạn chưa chọn chấm công nào.",
      text: "",
      icon: "warning",
    });
    return;
  }
  $.ajax({
    url: "/confirmTimekeeping",
    type: "POST",
    data: { arrId :JSON.stringify(arrId) },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      console.log(res);
      searchTimekeeping(1)
      swal({
        title: "Xác nhận thành công",
        text: "",
        icon: "success",
        dangerMode: true,
      });
      return;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // If fail
      swal({
        title: "Đã có lỗi xảy ra",
        text: "",
        icon: "warning",
        dangerMode: true,
      });
      console.log(textStatus + ": " + errorThrown);
      return;
    });
};
const deleteTimekeeping = () => {
    if (!navigator.onLine) {
      swal({
        title: "Kiểm tra kết nối internet!",
        text: "",
        icon: "warning",
      });
      return;
    }
    let arrId = [];
    $(".notConfirm").each(function () {
      // console.log(this);
      // console.log("$(this).prop();",$(this).prop("checked") )
      if( $(this).prop("checked")){
          let timekeeping=JSON.parse($(this).prop("value"))
          // console.log("timekeeping",timekeeping.id);
          arrId.push(timekeeping.id)
      }
    });
    if(arrId.length<1){
      swal({
        title: "Bạn chưa chọn chấm công nào.",
        text: "",
        icon: "warning",
      });
      return;
    }
    $.ajax({
      url: "/deleteTimekeeping",
      type: "POST",
      data: { arrId :JSON.stringify(arrId) },
      cache: false,
      timeout: 50000,
    })
      .done(function (res) {
        console.log(res);
        searchTimekeeping(1)
        swal({
          title: "Hủy thành công",
          text: "",
          icon: "success",
          dangerMode: true,
        });
        return;
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        swal({
          title: "Đã có lỗi xảy ra",
          text: "",
          icon: "warning",
          dangerMode: true,
        });
        console.log(textStatus + ": " + errorThrown);
        return;
      });
  };