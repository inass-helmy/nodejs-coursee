const form = document.getElementById("form");
const country = document.getElementById("country");
const input = document.getElementById("input");
const error = document.getElementById("error");
const forecast = document.getElementById("forecast");
const coordinates = document.getElementById("coordinates");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function clearDisplay() {
  country.textContent = "";
  forecast.textContent = "";
  coordinates.textContent = "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearDisplay();
  const response = await fetch(`/weather?country=${input.value}`);
  const data = await response.json();
  if (data.error) {
    error.textContent = data.error;
  } else {
    error.textContent = "";
    country.textContent = `Country: ${data.country.toUpperCase()}`;
    await delay(500);
    coordinates.textContent = `Coordinates: Lat - ${data.weatherStatus.location.lat}, Lon - ${data.weatherStatus.location.lon}`;
    await delay(500);
    forecast.textContent = `Weather: ${data.weatherStatus.current.condition.text} weather and temp equals ${data.weatherStatus.current.temp_c}`;
  }
});
