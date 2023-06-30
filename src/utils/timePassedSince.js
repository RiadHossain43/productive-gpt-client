import moment from "moment";
export function timePassedSince(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = 0;
  interval = seconds / 86400;
  if (interval > 1 && interval < 2)
    return "Yesterday at " + moment(date).format("HH:mm");
  interval = seconds / 3600;
  if (interval >= 2 && interval <= 24)
    return Math.floor(interval) + " hours ago";
  if (interval >= 1 && interval < 2) return "an hour ago";
  interval = seconds / 60;
  if (interval >= 2 && interval <= 60)
    return Math.floor(interval) + " minutes ago";
  if (interval >= 1 && interval < 2)
    return Math.floor(interval) + " minute ago";
  if ((seconds >= 0 && seconds <= 60) || seconds < 0) return "Just now";
  return moment(date).format("DD/MM/YYYY HH:mm");
}
