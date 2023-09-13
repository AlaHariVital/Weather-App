const apiKey = '0d177a872766c9c5389bcf595f3e61b1';

const weatherDataElemetnt = document.getElementById('weather-data');

const cityInputElemetn = document.getElementById('city-input');

const formEl = document.querySelector('form');

formEl.addEventListener('submit', () => {
  event.preventDefault();
  const cityValue = cityInputElemetn.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like ${Math.round(data.main.feels_like)}`,
      `Humidity:${data.main.humidity} %`,
      `Wind speed: ${data.wind.speed} m/s`,
    ];

    weatherDataElemetnt.querySelector(
      '.icon'
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`;

    weatherDataElemetnt.querySelector(
      '.temperature'
    ).textContent = `${temperature}°C`;

    weatherDataElemetnt.querySelector('.description').textContent = description;

    weatherDataElemetnt.querySelector('.details').innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join('');
  } catch (error) {
    weatherDataElemetnt.querySelector('.icon').innerHTML = '';
    weatherDataElemetnt.querySelector('.temperature').textContent = '';
    weatherDataElemetnt.querySelector('.description').textContent =
      'An error has occured enter correct city name';

    weatherDataElemetnt.querySelector('.details').innerHTML = '';
    console.log('Error : ', error);
  }
}
