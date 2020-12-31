$(document).ready(function () {
  $("#tabTimekeeping a").css({ "background-color": "#fff", color: "#f02a2a" });
});
const redirectListTimekeepingMonth = () => {
  window.location.href = "/admin/timekeepingInMonth";
};

const redirectListTimekeepingDay = () => {
  window.location.href = "/admin/timekeepingInDay";
};
