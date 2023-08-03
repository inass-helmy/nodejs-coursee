const express = require("express");
const { getWeather, getWeatherData } = require("./getWeather");
const hbs = require("hbs");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.set("view engine", "hbs");

const viewsDirectory = path.join(__dirname, "./src/views");
app.set("views", viewsDirectory);

const partialsDirectory = path.join(__dirname, "./src/partials");
hbs.registerPartials(partialsDirectory);

app.get("/", (req, res) => {
  res.render("index", {
    title: "HOME",
  });
});

app.get("/welcome", (req, res) => {
  res.render("welcome", {
    title: "Welcome Page",
    welcomeMessage: "Hello, Welcome in our weather check service.",
  });
});

app.get("/check", async (req, res) => {
  try {
    const selectedCountry = req.query.country || "egypt";
    const weatherStatus = await getWeather(selectedCountry);
    res.render("check", {
      title: "Check Weather",
      weatherStatus: weatherStatus,
    });
  } catch (error) {
    res.send("Error: " + error);
  }
});
//
app.get("/weather", async (req, res) => {
  const selectedCountry = req.query.country;

  if (!selectedCountry) {
    return res.send({ error: "Please provide a country name" });
  }
  try {
    const response = await getWeatherData(selectedCountry);
    res.send({ weatherStatus: response, country: selectedCountry });
  } catch (error) {
    res.send({ error });
  }
});

app.get("*", (req, res) => {
  res.send("404 Page Not Founded");
});
app.listen(port, () => {
  console.log("app listening on port " + port);
});
