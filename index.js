const apikey = "5f26e23f0ed7cb9e4a213e3a19a414ec";

const weatherDataEl = document.getElementById("weather-data");

const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
   getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`);
        
        if(!response.ok){
            throw new Error("Network response was not ok")
        }
        const data =await response.json();
        const temprature =Math.round(data.main.temp);
        const description=data.weather[0].description;
        const icon =data.weather[0].icon
        
        const details = [
            `Feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`,
          ];
      
          weatherDataEl.querySelector(
            ".icon"
          ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
          weatherDataEl.querySelector(
            ".temprature"
          ).textContent = `${temprature}°C`;
          weatherDataEl.querySelector(".description").textContent = description;
      
          weatherDataEl.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`)
            .join("");
      
    } catch (error) {
        weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temprature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error happened, please try again later";

    weatherDataEl.querySelector(".details").innerHTML = "";
    }
    
}

 