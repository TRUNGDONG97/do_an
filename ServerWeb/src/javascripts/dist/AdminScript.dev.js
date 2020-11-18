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
    url: "/addEmployee",
    type: "POST",
    data: {
      first_name: first_name,
      last_name: last_name,
      phone: phone,
      birthday: birthday,
      address: address,
      email: email,
      gener: gener ? 0 : 1,
      position: position // url_avatar: srcImg,

    },
    cache: false,
    timeout: 50000,
    beforeSend: function beforeSend() {
      $("#modalLoad").modal("show");
    }
  }).done(function (res) {
    console.log(res.result);

    if (res.result == 0) {
      $("#modalLoad").modal("hide");
      $("#txtAddPhone").val("");
      swal({
        title: "Số điện thoại đã tồn tại",
        text: "",
        icon: "warning"
      });
      return;
    }

    if (res.result == 1) {
      $("#modalLoad").modal("hide");
      $("#txtAddEmail").val("");
      swal({
        title: "Email đã tồn tại",
        text: "",
        icon: "warning"
      });
      return;
    }

    $("#addEmployeeModal").modal("hide");
    $("#txtAddFirstName").val("");
    $("#txtAddLastName").val("");
    $("#txtAddPhone").val("");
    $("#txtAddAddress").val("");
    $("#txtAddEmail").val("");
    swal({
      title: "Thêm thành công",
      text: "",
      icon: "success"
    }); // if (files.length > 0) {
    //   uploadImage(fileData);
    // }

    searchEmployee(1);
    $("#modalLoad").modal("hide");
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