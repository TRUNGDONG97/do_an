$(document).ready(function () {
  $("#tabMac a").css({
    "background-color": "#fff",
    color: "#078a23"
  });
  getMacAddress(1);
});
const getMacAddress = (currentPage) => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  //   var nameEmployee = $.trim($("#txtNameEmployee").val());
  //   var phoneEmployee = $.trim($("#txtPhoneEmployee").val());
  $.ajax({
    url: "/getMacAddress",
    type: "POST",
    data: { currentPage },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      console.log(res);
      $("#tableMacAddress").html(res.htmlTable);
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
}