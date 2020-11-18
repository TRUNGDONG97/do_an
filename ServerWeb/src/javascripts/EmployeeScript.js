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
  $("#txtEditBirthday").datepicker({
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true,
    orientation: "bottom auto",
  });
  $("#txtEditBirthday").datepicker("setDate", new Date());
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
    !first_name ||
    !last_name ||
    !phone ||
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
      position,
      // url_avatar: srcImg,
    },
    cache: false,
    timeout: 50000,
    beforeSend: function () {
      $("#modalLoad").modal("show");
    },
  })
    .done(function (res) {
      console.log(res.result);

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

const editEmployee = (employee) => {
  $("#txtEditFirstName").val(employee.first_name);
  $("#txtEditLastName").val(employee.last_name);
  $("#txtEditPhone").val(employee.phone);
  $("#txtEditAddress").val(employee.address);
  $("#txtEditEmail").val(employee.email);
  $("#editEmployeeModal").modal("show");
  if (employee.gener == 1) {
    $("#editSexMale").attr("checked", true);
  } else {
    $("#editSexFemale").attr("checked", true);
  }
  $("#editPosition").val(employee.position);
  $("#idEmployee").val(employee.id);
};
const saveEmployee = () => {
  var idEmployee = $("#idEmployee").val();
  // console.log("idEmployee", idEmployee);
  var first_name = $.trim($("#txtEditFirstName").val());
  var last_name = $.trim($("#txtEditLastName").val());
  var phone = $.trim($("#txtEditPhone").val());
  var birthday = $.trim($("#txtEditBirthday").val());
  var address = $.trim($("#txtEditAddress").val());
  var email = $.trim($("#txtEditEmail").val());
  var gener = $("#editSexMale").prop("checked");
  var position = $("#editPosition").val();
  // console.log("gener",gener)
  // console.log("first_name",first_name)
  // console.log("last_name",last_name)
  $.ajax({
    url: "/saveEmployee",
    type: "POST",
    data: {
      first_name,
      last_name,
      phone,
      birthday,
      address,
      email,
      gener: gener ? 1 : 0,
      position,
      idEmployee,
      // url_avatar: srcImg,
    },
    cache: false,
    timeout: 50000,
    beforeSend: function () {
      $("#modalLoad").modal("show");
    },
  })
    .done(function (res) {
      console.log(res.result);

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
      if (res.result == 1) {
        $("#modalLoad").modal("hide");
        $("#txtAddEmail").val("");
        swal({
          title: "Không có sinh viên này",
          text: "",
          icon: "warning",
        });
        return;
      }
      $("#editEmployeeModal").modal("hide");
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
const deleteEmployee = (id) => {
  console.log(id);
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  swal({
    title: "Bạn chắc chắn xóa chứ?",
    text: "",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((isConFirm) => {
    if (isConFirm) {
      $.ajax({
        url: "/deleteEmployee",
        type: "POST",
        data: {
          id,
        },
        cache: false,
        timeout: 50000,
        beforeSend: function () {
          $("#modalLoad").modal("show");
        },
      })
        .done(function (res) {
          $("#modalLoad").modal("hide");
          // console.log(res.result)
          if (res.result == 1) {
            swal({
              title: "Xóa thành công!",
              text: "",
              icon: "success",
            });
            searchEmployee(1);
          } else {
            swal({
              title: "Không tồn tại nhân viên này",
              text: "",
              icon: "warning",
            });
          }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          // If fail
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
    }
  });
};
const importEmployee = () => {
  try {
    var fileUpload = $("#txtFile").get(0);
    var files = fileUpload.files;
    if (files.length <= 0) {
      swal({
        title: "Chưa chọn file ",
        text: "",
        icon: "warning",
      });
      return;
    }
    $("#mdImport").modal("hide");
    $("#modalLoad").modal("show");
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileUpload.files[0]);
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
        cellNF: true,
        cellText: false,
      });
      var firstSheet = workbook.SheetNames[0];
      arrEmployee = XLSX.utils.sheet_to_row_object_array(
        workbook.Sheets[firstSheet]
      );
      // console.log(JSON.stringify(arrEmployee), "arr");
      $.ajax({
        url: "/importListEmployee",
        type: "POST",
        data: {
          arrEmployee: JSON.stringify(arrEmployee),
        },
        cache: false,
        timeout: 50000,
      })
        .done(function (res) {
          $("#txtFile").val("")
          $("#modalLoad").modal("hide");
          console.log(res.result, "res.result");
          if (res.listEmployeeError.length < 1) {
            swal({
              title: "Xóa thành công!",
              text: "",
              icon: "success",
            });
            searchEmployee(1);
          } else {
            swal({
              title:
                "Một số nhân viên sau không thể thêm do không có số điện thoại. ",
              text: "",
              icon: "warning",
              dangerMode: true,
            });
            searchEmployee(1);
          }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          // If fail
          $("#modalLoad").modal("hide");
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
  } catch (error) {
    $("#modalLoad").modal("hide");
    console.log("error", error);
  }
};
const exportFileEmployee = () => {
  window.location.href = '/exportFileEmployee'
  // alert(class_code)

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
