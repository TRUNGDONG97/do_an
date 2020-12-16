$(document).ready(function () {
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $("#tabTimekeeping a").css({ "background-color": "#fff", color: "#f02a2a" });
    $(".datepicker").datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom auto",
    });
    $("#dateStart").datepicker("setDate", year + "-" + month + "-" + "01");
    $("#dateEnd").datepicker("setDate", new Date());
    searchTimekeeping(1)
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
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var date = currentDate.getDate();
    var idEmployee = $.trim($("#idEmployee").val());
    var startDate = $.trim($("#dateStart").val());
    var endDate = $.trim($("#dateEnd").val());
    if (!startDate) {
        startDate = year + "-" + month + "-" + "01"
    }
    if (!endDate) {
        endDate = year + "-" + month + "-" + date
    }
    $.ajax({
        url: "/seacherDetailTimekeeping",
        type: "POST",
        data: { currentPage, idEmployee, startDate, endDate },
        cache: false,
        timeout: 50000,
    })
        .done(function (res) {
            // console.log(res);
            $("#tableDetailClass").html(res.htmlTable);
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
            console.log(textStatus + ': ' + errorThrown);
            return;
        });
}

const exportFileTimekeeping = () => {
    var id_employee = $.trim($("#idEmployee").val());
    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var date = currentDate.getDate();
    var startDate = $.trim($("#dateStart").val());
    var endDate = $.trim($("#dateEnd").val());
    if (!startDate) {
        startDate = year + "-" + month + "-" + "01"
    }
    if (!endDate) {
        endDate = year + "-" + month + "-" + date
    }
    window.location.href = `/exportFileTimekeeping?idEmployee=${id_employee}&startDate=${startDate}&endDate=${endDate}`
}