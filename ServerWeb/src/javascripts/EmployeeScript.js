$(document).ready(function () {
  $("#tabEmployee a").css({ "background-color": "#fff", color: "#078a23" });
  searchEmployee(1);
  // $('#btnSearch').click(function () {
  //     searchStudent(1)
  // })
  // $('#txtAddBirthday').datepicker({
  //     weekStart: 1,
  //     daysOfWeekHighlighted: "6,0",
  //     autoclose: true,
  //     todayHighlight: true,
  //     orientation: "bottom auto",
  // });
  // $('#txtAddBirthday').datepicker("setDate", new Date());
  // $('#txtEditBirthday').datepicker({
  //     weekStart: 1,
  //     daysOfWeekHighlighted: "6,0",
  //     autoclose: true,
  //     todayHighlight: true,
  //     orientation: "bottom auto",
  // });
  // $('#txtEditBirthday').datepicker();
});
const searchEmployee = (currentPage) => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  $.ajax({
    url: "/searchEmployee",
    type: "POST",
    data: { currentPage },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
        console.log(res)
      $("#tableEmployee").html(res.htmlTable);
     
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
      // console.log(textStatus + ': ' + errorThrown);
      return;
    });
};
