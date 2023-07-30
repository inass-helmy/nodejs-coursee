const express = require("express");
const { getWeather } = require("./getWeather");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
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
app.listen(port, () => {
  console.log("app listening on port " + port);
});
