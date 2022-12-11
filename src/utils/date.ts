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

function formatAMPM(date: Date) {
  var hours = date.getHours();
  let ampm = "";
  if (hours < 24) {
    ampm = "Evening";
  } else if (hours < 15) {
    ampm = "Afternoon";
  } else {
    ampm = "Morning";
  }
  return ampm;
}

export const timeOfDay = formatAMPM(now);

export const today =
  days[now.getDay()] + ", " + months[now.getMonth()] + " " + date;
