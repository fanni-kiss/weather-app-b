function formatDate(timestamp){
let now = new Date(timestamp);


let h2 = document.querySelector("h2");

let hours = now.getHours();
if (hours < 10){
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10){
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

h2.innerHTML = `${day}, ${hours}:${minutes}`;

}


function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
   document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
   let iconElement = document.querySelector("#icon")
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
    
  let iconElement2 = document.querySelector("#icon2")
  iconElement2.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement2.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  celsiusTemperature = response.data.main.temp;

}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
    let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class ="row">`;
  forecast.forEach(function(day){
    forecastHTML = forecastHTML + 
   ` 
  <div class="col-2">${day} <br> 16°C | <span class="minimum-temperature">5°C</span>  <br> <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="40px"></div>`;
  })
  

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1575caff0f93dfb2487bd2757141db40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function search(event) {
  event.preventDefault();
  let apiKey = "1575caff0f93dfb2487bd2757141db40";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayFahreinheitTemperature(event){
  event.preventDefault();
  let fahreinheitTemperature = (celsiusTemperature*9) / 5+32;
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML = Math.round(fahreinheitTemperature);
  celsiusLink.classList.remove("active");
  fahreinheitLink.classList.add("active");
}


function displayCelsiusTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahreinheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let fahreinheitLink = document.querySelector("#fahreinheit-link");
fahreinheitLink.addEventListener("click", displayFahreinheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);