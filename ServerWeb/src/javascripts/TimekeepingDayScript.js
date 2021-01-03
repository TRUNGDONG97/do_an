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
    searchTimekeeping(1)
});
const searchTimekeeping=(currentPage)=>{
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
        date = year + "-" + month + "-" + date1
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
            console.log(textStatus + ': ' + errorThrown);
            return;
        });
}