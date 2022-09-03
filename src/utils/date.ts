var now = new Date();

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

var months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

var date = (now.getDate() < 10 ? "" : "") + now.getDate();

export const today =
  days[now.getDay()] + ", " + months[now.getMonth()] + " " + date;
