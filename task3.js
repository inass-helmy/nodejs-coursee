const { getWeather } = require("./getWeather");

const country = process.argv[2] || "egypt";

getWeather(country)
  .then((weatherStatus) => {
    return weatherStatus;
  })
  .catch((error) => {
    console.error("Error:", error);
  });
