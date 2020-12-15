$(document).ready(function () {
    $("#tabTimekeeping a").css({ "background-color": "#fff", color: "#f02a2a" });
    // searchAdmin(1);
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $('h4').append(month + "/" + year)
    seacherListTimekeeping(1)
    $(".datepicker").datepicker({
        weekStart: 1,
        daysOfWeekHighlighted: "6,0",
        autoclose: true,
        todayHighlight: true,
        orientation: "bottom auto",
    });
    $("#dateStart").datepicker("setDate", year + "-" + month + "-" + "01");
    $("#dateEnd").datepicker("setDate", new Date());
});
const seacherListTimekeeping = (currentPage) => {
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
    var date=date.getDate();
    var nameEmployee = $.trim($("#txtNameEmployee").val());
    var employee_code = $.trim($("#txtCodeEmployee").val());
    var startDate = $.trim($("#dateStart").val());
    var endDate = $.trim($("#dateEnd").val());
    console.log("startDate",startDate);
    console.log("endDate",endDate);
    if(!startDate){
        startDate= year + "-" + month + "-" + "01"   
    }
    if(!endDate){
        endDate= year + "-" + month + "-" + date
    }
    $.ajax({
        url: "/seacherListTimekeeping",
        type: "POST",
        data: { currentPage, nameEmployee, employee_code, startDate, endDate },
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

const exportFileTimekeepingAllEmployee = () => {

}