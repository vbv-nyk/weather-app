const WeatherApiKey = 'a22e445276dbf35fc50df039fcbfc791';
const GiphyKey = 'VElgm609HtWBN2x1hpexhN9czkI0WBei';
const img = document.querySelector(".display-gif");
const cityInput = document.querySelector(".city-input");
const maxTemp = document.querySelector(".max-temp");
const minTemp = document.querySelector(".min-temp");
const temp = document.querySelector(".temp");
const pressure = document.querySelector(".pressure");
async function loadWeather(cityName) {
    try {
        img.src = `./loading.gif`;
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WeatherApiKey}`);
        const weatherResponseData = await weatherResponse.json();
        if (weatherResponseData.cod == "404") {
            throw new Error("error 404, might be an invalid city");
        }
        let weather = weatherResponseData.weather[0];
        const giphyResponse = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${GiphyKey}&s=${weather.main + weather.description} weather`);
        const giphyResponseData = await giphyResponse.json();
        img.src = giphyResponseData.data.images.original.url;
        let otherWeatherDetails = weatherResponseData.main;
        console.log(otherWeatherDetails.temp, otherWeatherDetails.temp_max, otherWeatherDetails.temp_min, otherWeatherDetails.pressure);
        maxTemp.textContent = `Max Temperature is ${otherWeatherDetails.temp_max}`;
        minTemp.textContent = `Minimum Temperature is ${otherWeatherDetails.temp_min}`;
        temp.textContent = `Temperature is ${otherWeatherDetails.temp}`;
        pressure.textContent = `Pressure is ${otherWeatherDetails.pressure}`;

    } catch (error) {
        console.log(error);
        img.src = `./not-found.gif`;
        maxTemp.textContent = ``;
        minTemp.textContent = ``;
        temp.textContent = ``;
        pressure.textContent = ``;
    }
}

cityInput.addEventListener("change", () => {
    loadWeather(cityInput.value);
})
