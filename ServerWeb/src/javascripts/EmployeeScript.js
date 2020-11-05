$(document).ready(function () {
  $("#tabEmployee a").css({ "background-color": "#fff", color: "#078a23" });
  searchEmployee(1);
  $("#btnSearchEmployee").click(function () {
    searchEmployee(1);
  });
  $("#txtAddBirthday").datepicker({
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom auto",
  });
  $("#txtAddBirthday").datepicker("setDate", new Date());
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
  var nameEmployee = $.trim($("#txtNameEmployee").val());
  var phoneEmployee = $.trim($("#txtPhoneEmployee").val());
  $.ajax({
    url: "/searchEmployee",
    type: "POST",
    data: { currentPage, phoneEmployee, nameEmployee },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      // console.log(res);
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
const addEmployee = async () => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  var first_name = $.trim($("#txtAddFirstName").val());
  var last_name = $.trim($("#txtAddLastName").val());
  var phone = $.trim($("#txtAddPhone").val());
  var birthday = $.trim($("#txtAddBirthday").val());
  var address = $.trim($("#txtAddAddress").val());
  var email = $.trim($("#txtAddEmail").val());
  var gener = $("#addSexFemale").prop("checked");
  var position = $("#addPosition").val();
  console.log("gener", gener);
  console.log("birthday", birthday);
  console.log("position", position);
  //get file image
  // var fileUpload = $("#ImageStudent").get(0);
  // var files = fileUpload.files;

  if (
    !first_name  ||
    !last_name ||
    !phone  ||
    !birthday ||
    !address ||
    !position
  ) {
    swal({
      title: "Chưa nhập đầy đủ thông tin",
      text: "",
      icon: "warning",
    });
    return;
  }
  // checkedMssv(mssv)
  // checkedPhone(phone)
  // checkedMail(email)
  // console.log(files.length);

  var email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!email_regex.test(email)) {
    swal({
      title: "Email không hợp lệ",
      text: "",
      icon: "warning",
    });
    return;
  }
  var vnf_regex = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g;
  if (!vnf_regex.test(phone) || phone.length != 10) {
    swal({
      title: "Số điện thoại không hợp lệ ",
      text: "",
      icon: "warning",
    });
    return;
  }
  // var srcImg;
  // if (files.length > 0) {
  //     var fileData = new FormData();
  //     var fileName = "";
  //     for (var i = 0; i < files.length; i++) {
  //         fileData.append(files[i].name, files[i]);
  //         fileName = files[i].name;
  //     }
  //     srcImg = window.location.origin + "/upload/" + fileName.replace(/ /g, "_")
  // }

  // console.log(typeof files)
  $.ajax({
    url: "/addEmployee",
    type: "POST",
    data: {
      first_name,
      last_name,
      phone,
      birthday,
      address,
      email,
      gener: gener ? 0 : 1,
      position
      // url_avatar: srcImg,
    },
    cache: false,
    timeout: 50000,
    beforeSend: function () {
      $("#modalLoad").modal("show");
    },
  })
    .done(function (res) {
      console.log(res.result)

      if (res.result == 0) {
        $("#modalLoad").modal("hide");
        $("#txtAddPhone").val("");
        swal({
          title: "Số điện thoại đã tồn tại",
          text: "",
          icon: "warning",
        });
        return;
      }
      if (res.result == 1) {
        $("#modalLoad").modal("hide");
        $("#txtAddEmail").val("");
        swal({
          title: "Email đã tồn tại",
          text: "",
          icon: "warning",
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
        icon: "success",
      });

      // if (files.length > 0) {
      //   uploadImage(fileData);
      // }
      searchEmployee(1);
      $("#modalLoad").modal("hide");
      return;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      // If
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

const editEmployee=()=>{
  console.log()
}

function checkedMail(email) {
  var email_regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!email_regex.test(email)) {
    swal({
      title: "Email không hợp lệ",
      text: "",
      icon: "warning",
    });
    return;
  }
}

function checkedPhone(phone) {
  var vnf_regex = /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/g;
  if (!vnf_regex.test(phone) || phone.length != 10) {
    swal({
      title: "Số điện thoại không hợp lệ ",
      text: "",
      icon: "warning",
    });
    return;
  }
}

function convertDate(date) {
  var currentDate = new Date(date);
  var dd = String(currentDate.getDate()).padStart(2, "0");
  var mm = String(currentDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = currentDate.getFullYear();

  return yyyy + "-" + mm + "-" + dd;
}
