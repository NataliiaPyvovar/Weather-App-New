//Current Date and Time
function showDate() {
    let now = new Date();
  
    let date = now.getDate();
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];

    let day = days[now.getDay()];
    let month = now.toLocaleString("en", { month: "long" });
    let year = now.getFullYear();
    let h3 = document.querySelector("h3");
    h3.innerHTML = `${date}, ${month},  ${year}`;
  
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = document.querySelector("h4");

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    time.innerHTML = `${day}, ${hours}:${minutes}`;
  }
  showDate();


  // Search city
  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  
  // Search Engine
  let form = document.querySelector(".search-form");
  form.addEventListener("submit", citySubmit);
  
  function citySubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchCity(city) {
    let apiKey = "ad9ec42f104tb433904o587aca6051b1";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(displayAttributes);
  }
  
  function displayAttributes(response) {
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windELement = document.querySelector("#windspeed");
    let iconElement = document.querySelector("#icon");
    let temperatureElement = document.querySelector("#temperature");
    let dateElement = document.querySelector("#date");
    let cityElement = document.querySelector("#city");
  
  
    
    humidityElement.innerHTML = response.data.temperature.humidity + `%`;
    windELement.innerHTML = Math.round(response.data.wind.speed) + ` km/h`;
    descriptionElement.innerHTML = response.data.condition.description;
    document.querySelector("#city").innerHTML = response.data.city;
    celsiusTemperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.city;
    // dateElement.innerHTML = formatDate(response.data.time * 1000);

  
    iconElement.setAttribute("src",`https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    iconElement.setAttribute("alt", response.data.condition.description);
    getForecast(response.data.coordinates);
  }


  // Current location
  function getCurrentLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "ad9ec42f104tb433904o587aca6051b1";
    
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
    axios.get(apiUrl).then(displayAttributes);
  }
  
  function getPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(getCurrentLocation);
  }
  
  let getCurrentCity = document.querySelector("#get-current-city");
  getCurrentCity.addEventListener("click", getPosition);



  
// Daily weather forecast


function displayForecast(response) {
  console.log(response.data);

  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="weather-forecast-day">${formatDay(
              forecastDay.time
            )}</div>
            
            <img
              src= "https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                forecastDay.condition.icon
              }.png"
              alt=""
              
            />
            <div class="weather-forecast-temps">
              <span class="temp-max">${Math.round(
                forecastDay.temperature.maximum
              )}°</span>
              <span class="temp-min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
            </div>
          </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

  searchCity("Kyiv");
  displayForecast();
  