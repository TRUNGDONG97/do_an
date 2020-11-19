"use strict";

$(document).ready(function () {
  $("#tabAdmin a").css({
    "background-color": "#fff",
    color: "#078a23"
  });
  searchAdmin(1);
});

var searchAdmin = function searchAdmin(currentPage) {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning"
    });
    return;
  } //   var nameEmployee = $.trim($("#txtNameEmployee").val());
  //   var phoneEmployee = $.trim($("#txtPhoneEmployee").val());


  $.ajax({
    url: "/searchAdmin",
    type: "POST",
    data: {
      currentPage: currentPage
    },
    cache: false,
    timeout: 50000
  }).done(function (res) {
    console.log(res);
    $("#tableAdmin").html(res.htmlTable);
    return;
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // If fail
    swal({
      title: "Đã có lỗi xảy ra",
      text: "",
      icon: "warning",
      dangerMode: true
    });
    console.log(textStatus + ": " + errorThrown);
    return;
  });
};

var addAdmin = function addAdmin() {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning"
    });
    return;
  }

  var username = $.trim($("#txtAddUserName").val());
  var email = $.trim($("#txtAddAdminEmail").val());
  var password = $.trim($("#txtAddPassWord").val());
  var rePassword = $.trim($("#txtPassWordComfirm").val()); //get file image
  // var fileUpload = $("#ImageStudent").get(0);
  // var files = fileUpload.files;

  if (!username || !email || !password || !rePassword) {
    swal({
      title: "Chưa nhập đầy đủ thông tin",
      text: "",
      icon: "warning"
    });
    return;
  }

  if (rePassword !== password) {
    swal({
      title: "Mật khẩu xác nhận không đúng",
      text: "",
      icon: "warning"
    });
    return;
  }

  var email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  if (!email_regex.test(email)) {
    swal({
      title: "Email không hợp lệ",
      text: "",
      icon: "warning"
    });
    return;
  }

  $.ajax({
    url: "/addAdmin",
    type: "POST",
    data: {
      username: username,
      email: email,
      password: password
    },
    cache: false,
    timeout: 50000,
    beforeSend: function beforeSend() {
      $("#modalLoad").modal("show");
    }
  }).done(function (res) {
    console.log(res.result);
    $("#modalLoad").modal("hide");

    if (res.result == 0) {
      swal({
        title: "Tài khoản đã tồn tại",
        text: "",
        icon: "warning"
      });
      return;
    }

    if (res.result == 1) {
      swal({
        title: "Email đã tồn tại",
        text: "",
        icon: "warning"
      });
      return;
    }

    $("#modalLoad").modal("hide");
    $("#addAdminModal").modal("hide");
    $("#txtAddUserName").val("");
    $("#txtAddAdminEmail").val("");
    $("#txtAddPassWord").val("");
    $("#txtPassWordComfirm").val("");
    swal({
      title: "Thêm thành công",
      text: "",
      icon: "success"
    });
    searchAdmin(1);
    return;
  }).fail(function (jqXHR, textStatus, errorThrown) {
    // If
    $("#modalLoad").modal("hide");
    swal({
      title: "Đã có lỗi xảy ra",
      text: "",
      icon: "warning",
      dangerMode: true
    }); // console.log(textStatus + ': ' + errorThrown);

    return;
  });
};

var deleteAdmin = function deleteAdmin(id) {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning"
    });
    return;
  }

  swal({
    title: "Bạn chắc chắn xóa chứ?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then(function (isConFirm) {
    if (isConFirm) {
      $.ajax({
        url: "/deleteAdmin",
        type: "POST",
        data: {
          id: id
        },
        cache: false,
        timeout: 50000,
        beforeSend: function beforeSend() {
          $("#modalLoad").modal("show");
        }
      }).done(function (res) {
        $("#modalLoad").modal("hide"); // console.log(res.result)

        if (res.result == 1) {
          swal({
            title: "Xóa thành công!",
            text: "",
            icon: "success"
          });
          searchAdmin(1);
        } else {
          swal({
            title: "Không tồn tại nhân viên này",
            text: "",
            icon: "warning"
          });
        }
      }).fail(function (jqXHR, textStatus, errorThrown) {
        // If fail
        $("#modalLoad").modal("hide");
        swal({
          title: "Đã có lỗi xảy ra",
          text: "",
          icon: "warning",
          dangerMode: true
        }); // console.log(textStatus + ': ' + errorThrown);

        return;
      });
    }
  });
};