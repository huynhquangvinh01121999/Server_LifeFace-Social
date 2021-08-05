function formatDate(datetime) {
  return datetime.toISOString().slice(0, 10);
}

function timeNow() {
  var datetime = new Date();
  // current hours
  let hours = datetime.getHours();

  // current minutes
  let minutes = datetime.getMinutes();

  // current seconds
  let seconds = datetime.getSeconds();

  return formatDate(datetime) + " " + hours + ":" + minutes + ":" + seconds;
}

module.exports = { timeNow };
