//Date
let now = new Date();
let date = document.querySelector("h6");
let ukCityDay = document.querySelector("#uk-city-day");
let ukCityDate = document.querySelector("#uk-city-date");
let ukCityMonth = document.querySelector("#uk-city-month");
let abroadCityDay = document.querySelector("#abroad-city-day");
let abroadCityDate = document.querySelector("#abroad-city-date");
let abroadCityMonth = document.querySelector("#abroad-city-month");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
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

let todayDay = now.getDay();
let todayYear = now.getFullYear();
let todayMonth = now.getMonth();
let todayDate = now.getDate();
let todayHour = now.getHours();
if (todayHour < 10) {
  todayHour = `0${todayHour}`;
}
let todayMinute = now.getMinutes();
if (todayMinute < 10) {
  todayMinute = `0${todayMinute}`;
}

date.innerHTML = `${days[todayDay]} ${todayDate} ${months[todayMonth]} ${todayYear} ${todayHour}:${todayMinute}`;
ukCityDay.innerHTML = `${days[todayDay]}`;
ukCityDate.innerHTML = `${todayDate}`;
ukCityMonth.innerHTML = `${months[todayMonth]}`;
abroadCityDay.innerHTML = `${days[todayDay]}`;
abroadCityDate.innerHTML = `${todayDate}`;
abroadCityMonth.innerHTML = `${months[todayMonth]}`;

//City Search Bar
function goSearch(event) {
  event.preventDefault();
  let cityChoice = document.querySelector("#city-choice"); //cityChoice is the form input id

  //Real temperature/name display

  let apiKey = "3ee778166b5c3d35d5cfcd91d9ea45ff";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityChoice.value}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name.toUpperCase();
  let currentTemp = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = `${currentTemp}°C`;
}

let cityInput = document.querySelector("#city-search-form");
cityInput.addEventListener("submit", goSearch);

//Fahrenheit and Celcius Converter Buttons (LONDON)
function convertF() {
  let temperature = document.querySelector("#current-temp");
  let fahrenheit = Math.round(18 * 1.8 + 32);
  temperature.innerHTML = `${fahrenheit} °F`;
}

function convertC() {
  let temperature = document.querySelector("#current-temp");
  let celcius = 32.4 / 1.8;
  temperature.innerHTML = `${celcius} °C`;
}

let fahrenheitButton = document.querySelector("#convert-far");
fahrenheitButton.addEventListener("click", convertF);

let celciusButton = document.querySelector("#convert-cel");
celciusButton.addEventListener("click", convertC);

//Current Location Button START

function showCurrentLocationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let CurrentLocationButton = document.querySelector(".searchCurrent");
CurrentLocationButton.addEventListener("click", showCurrentLocationTemp);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3ee778166b5c3d35d5cfcd91d9ea45ff";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  console.log(position);
  axios.get(apiUrl).then(displayCurrentLocationTemperature);
}

function displayCurrentLocationTemperature(response) {
  let currentLocationTemp = `${Math.round(response.data.main.temp)}`;
  let currentLocationName = response.data.name;
  let liveTemp = document.querySelector("#temp-here");
  liveTemp.innerHTML = `${currentLocationTemp} °C`;
  let liveLocate = document.querySelector("#city-here");
  liveLocate.innerHTML = currentLocationName.toUpperCase();
}

//Current Location Button END
