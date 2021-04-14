export function roundTemp(temp) {
  const rounded = Math.floor(temp);
  return rounded;
}

export function convertDate(dt) {
  let convertedDate = new Date(dt * 1000);
  //console.log(convertedDate);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[convertedDate.getUTCMonth()]; //months from 1-12
  const day = convertedDate.getUTCDate();
  const year = convertedDate.getUTCFullYear();

  const fullDate = `${day}, ${month} ${year}`;
  return fullDate;
}

export function showIcon(id) {
  console.log(id);
  if (id >= 200 && id < 300) {
    return <i className="wi wi-thunderstorm display-1"></i>;
  }
  if (id >= 300 && id < 400) {
    return <i className="wi wi-sleet display-1"></i>;
  }
  if (id >= 500 && id < 600) {
    return <i className="wi wi-storm-showers display-1"></i>;
  }

  if (id >= 600 && id < 700) {
    return <i className="wi wi-snow display-1"></i>;
  }

  if (id >= 700 && id < 800) {
    return <i className="wi wi-fog display-1"></i>;
  }
  if (id === 800) {
    return <i className="wi wi-day-sunny display-1"></i>;
  }
  if (id > 800) {
    return <i className="wi wi-day-fog display-1"></i>;
  }
}
