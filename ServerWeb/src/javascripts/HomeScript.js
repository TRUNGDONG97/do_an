const ajaxGetCountEmployee = $.ajax({
    url: '/getCountEmployee',
    type: 'GET',
    dataType: "json",
    cache: false,
    timeout: 50000,
})
// const ajaxGetCountClass = $.ajax({
//     url: '/getCountClass',
//     type: 'GET',
//     dataType: "json",
//     cache: false,
//     timeout: 50000,
// })
// const ajaxGetCountTeacher = $.ajax({
//     url: '/getCountTeacher',
//     type: 'GET',
//     dataType: "json",
//     cache: false,
//     timeout: 50000,
// })
// const ajaxGetCountSubject = $.ajax({
//     url: '/getCountSubject',
//     type: 'GET',
//     dataType: "json",
//     cache: false,
//     timeout: 50000,
// })
// ajaxGetStudent.id=1
// ajaxGetTeacher.id=2
// ajaxGetClass.id=3
$(document).ready(function () {

    $('#tabHome a').css({
        "background-color": "#fff",
        "color": "#078a23"
    })
    $('#employee-selection').click(function () {
        window.location = '/admin/employee';
    })

    // $.when(ajaxGetCountEmployee).done(function (resEmployee) {
    //     console.log(resEmployee, "dsdsdssdsdd")
    //     $('#employee-selection span').append(resEmployee[0].countEmployee)
    //     // $('#teacher-selection span').append(resTeacher[0].countTeacher)
    //     // $('#class-selection span').append(resClass[0].countClass)
    //     // $('#subject-selection span').append(resSubject[0].countSubject)
    // }).fail(function (result) {
    //     swal({
    //         title: "Đã có lỗi xảy ra",
    //         text: "",
    //         icon: "warning",
    //         dangerMode: true
    //     })
    //     console.log(result)
    // })
    $.when(ajaxGetCountEmployee).done(function(resEmployee) {
       console.log(resEmployee)
        $('#employee-selection span').append(resEmployee[0].countEmployee)
        // $('#teacher-selection span').append(resTeacher[0].countTeacher)
        // $('#class-selection span').append(resClass[0].countClass)
        // $('#subject-selection span').append(resSubject[0].countSubject)
    }).fail(function(result) {
        console.log("result",result)
        swal({
                title: "Đã có lỗi xảy ra",
                text: "",
                icon: "warning",
                dangerMode: true
            })
            // console.log(result)
    })
});