$(document).ready(function () {
  $("#tabMac a").css({
    "background-color": "#fff",
    color: "#078a23"
  });
  getMacAddress(1);
  $("#btnAddMacOnServer").click(addMacOnServer);
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
const addMacAddress = () => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  var macAddress = $.trim($("#txtAddMacAddress").val())
  $.ajax({
    url: "/addMacAddress",
    type: "POST",
    data: { macAddress },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      console.log(res);
      $("#modalLoad").modal("hide");
      if (res.result == 0) {
        swal({
          title: "Địa chỉ mac đã tồn tại",
          text: "",
          icon: "warning",
        });
        return;
      }
      // $("#tableMacAddress").html(res.htmlTable);
      swal({
        title: "Thêm thành công",
        text: "",
        icon: "success",
      });
      $("#addMacModal").modal("hide")
      getMacAddress(1)
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

const deleteMacAddress = (id) => {
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
        url: "/deleteMac",
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
            $("#txtAddMacAddress").val("");
            getMacAddress(1);
          } else {
            swal({
              title: "Không tồn tại địa chỉ mac  này",
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
}
const editMacAddress = (macAddress) => {
  $("#txtEditMacAddress").val(macAddress.address_mac);
  $("#idMacAddressEdit").val(macAddress.id);
  $("#editMacModal").modal("show");
}
const saveMacAddress = () => {
  if (!navigator.onLine) {
    swal({
      title: "Kiểm tra kết nối internet!",
      text: "",
      icon: "warning",
    });
    return;
  }
  var macAddress = $.trim($("#txtEditMacAddress").val())
  var id = $.trim($("#idMacAddressEdit").val())
  $.ajax({
    url: "/editMacAddress",
    type: "POST",
    data: { macAddress, id },
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      console.log(res);
      $("#modalLoad").modal("hide");
      if (res.result == 0) {
        swal({
          title: "Không tìm thấy địa chỉ mac này",
          text: "",
          icon: "warning",
        });
        return;
      }

      if (res.result == 1) {
        swal({
          title: "Địa chỉ mac đã tồn tại",
          text: "",
          icon: "warning",
        });
        return;
      }
      // $("#tableMacAddress").html(res.htmlTable);
      swal({
        title: " Thành công",
        text: "",
        icon: "success",
      });
      $("#txtAddMacAddress").val("");
      $("#editMacModal").modal("hide")
      getMacAddress(1)
      return;
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
}
const addMacOnServer = () => {
  $.ajax({
    url: "/getMacOnServer",
    type: "GET",
    cache: false,
    timeout: 50000,
  })
    .done(function (res) {
      console.log(res);
      $("#modalLoad").modal("hide");
      $("#addMacModal").modal("show")

      $("#txtAddMacAddress").val(res.macAddress);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      $("#modalLoad").modal("hide");
      $("#addMacModal").modal("hide")
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