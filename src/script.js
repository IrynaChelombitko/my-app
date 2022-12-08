function realTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayCurrent = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayCurrent];

  return `${day} ${hours}:${minutes}`;
}

let currentTime = document.querySelector("#time");
let currentDate = new Date();
currentTime.innerHTML = realTime(currentDate);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function searchCity(event) {
  event.preventDefault();
  let heading = document.querySelector("h1");
  let nameCity = document.querySelector(".form-control");
  heading.innerHTML = `${nameCity.value}`;
  let units = "metric";
  let apiKey = "ddab274f9388f181c85037de8fd70061";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  console.log();
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `${temperature}`;
  let temp = document.querySelector("#temperature");
  temp.innerHTML = message;

  let cityCurrent = `${city}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityCurrent;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `wind speed ${Math.round(
    response.data.wind.speed
  )} km/h`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `humidity ${response.data.main.humidity} %`;
  let icontyElement = document.querySelector("#icon");
  icontyElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "ddab274f9388f181c85037de8fd70061";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";

  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);

let searchForm = document.querySelector("#city-input");
searchForm.addEventListener("submit", searchCity);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = `${forecastHTML}
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
