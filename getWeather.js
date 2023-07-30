const request = require("request");

const getWeather = (country) => {
  return new Promise((resolve, reject) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=2947b9e37c7d4c889cb113105233007&q=${country}&aqi=no`;
    request({ url, json: true }, (error, response) => {
      if (error) {
        reject("Something went wrong, please try again later.");
      } else if (response.body.error?.message) {
        reject(response.body.error.message);
      } else {
        const { location, current } = response?.body;
        const displayMsg = `${country.toUpperCase()} with Lat: ${location.lat} and Lon: ${
          location.lon
        } has ${current.condition.text} weather and temp equals ${current.temp_c}`;
        console.log(displayMsg);
        resolve(displayMsg);
      }
    });
  });
};

module.exports = {
  getWeather,
};
