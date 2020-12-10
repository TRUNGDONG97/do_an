$(document).ready(function () {
    $("#tabTimekeeping a").css({ "background-color": "#fff", color: "#078a23" });
    // searchAdmin(1);
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    $('h4').append(month + "/" + year)
    seacherListTimekeeping(1)
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
    var nameEmployee = $.trim($("#txtNameEmployee").val());
    var employee_code = $.trim($("#txtCodeEmployee").val());
    $.ajax({
        url: "/seacheListTimekeeping",
        type: "POST",
        data: { currentPage, nameEmployee, employee_code },
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

const exportFileTimekeepingAllEmployee=()=>{
    
}