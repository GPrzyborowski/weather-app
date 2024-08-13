const input = document.querySelector('.container__city-input')
const icon = document.querySelector('.weather-info__data--icon')
const temperature = document.querySelector('.weather-info__data--temperature')
const humidity = document.querySelector('.weather-info__data--humidity')
const wind = document.querySelector('.weather-info__data--wind')
const clouds = document.querySelector('.weather-info__data--clouds')
const submitBtn = document.querySelector('.container__submit')
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=[yourApiKey]'
const API_UNIT = '&units=metric'

const city = 'new york'
const URL = API_LINK + city + API_KEY + API_UNIT
axios
	.get(URL)
	.then(res => console.log(res))
	.catch(err => console.error(err))

const showWeather = () => {
	const city = input.value
	const URL = API_LINK + city + API_KEY + API_UNIT
	axios
		.get(URL)
		.then(res => {
			icon.setAttribute('src', 'https://openweathermap.org/img/wn/' + res.data.weather[0].icon + '@2x.png')
			temperature.textContent = Math.floor(res.data.main.temp) + '°C'
			humidity.textContent = Math.floor(res.data.main.humidity) + '%'
			wind.textContent = Math.floor(res.data.wind.speed) * 3.6 + ' km/h'
			clouds.textContent = Math.floor(res.data.clouds.all) + '%'
		})
		.catch(err => console.error(err))
}

submitBtn.addEventListener('click', showWeather)
