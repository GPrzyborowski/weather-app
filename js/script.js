const darkModeBtn = document.querySelector('.nav__dark-mode')
const pageBody = document.querySelector('body')
const cityLabel = document.querySelector('.container__city-label')
const weatherInfoData = document.querySelectorAll('.weather-info__data')
const infoBoxDisplay = document.querySelector('.info-box')
const input = document.querySelector('.container__city-input')
const icon = document.querySelector('.weather-info__data--icon')
const time = document.querySelector('.weather-info__data--time')
const temperature = document.querySelector('.weather-info__data--temperature')
const humidity = document.querySelector('.weather-info__data--humidity')
const wind = document.querySelector('.weather-info__data--wind')
const clouds = document.querySelector('.weather-info__data--clouds')
const submitBtn = document.querySelector('.container__submit')
const metricUnit = document.querySelector('.metric-unit')
const imperialUnit = document.querySelector('.imperial-unit')
const unitHeading = document.querySelectorAll('.container__unit--heading')
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=[your_api_key]'
const API_UNIT_METRIC = '&units=metric'
const API_UNIT_IMPERIAL = '&units=imperial'
let URL

const showWeather = () => {
	const city = input.value
	if(metricUnit.checked) {
		URL = API_LINK + city + API_KEY + API_UNIT_METRIC
	} else {
		URL = API_LINK + city + API_KEY + API_UNIT_IMPERIAL
	}
	axios
		.get(URL)
		.then(res => {
			icon.setAttribute('src', 'https://openweathermap.org/img/wn/' + res.data.weather[0].icon + '@2x.png')

			const date = new Date()
			const hour = date.getUTCHours()
			const minutes = date.getUTCMinutes()
			const localTimezone = res.data.timezone / 3600
			const localHour = (hour + localTimezone + 24) % 24
			time.textContent = localHour + ':' + minutes
			console.log(res);
			if(metricUnit.checked) {
				temperature.textContent = Math.floor(res.data.main.temp) + '°C'
				wind.textContent = Math.floor(res.data.wind.speed) * 3.6 + ' km/h'
			} else {
				temperature.textContent = Math.floor(res.data.main.temp) + '°F'
				wind.textContent = res.data.wind.speed + ' mph'

			}
				humidity.textContent = Math.floor(res.data.main.humidity) + '%'
				clouds.textContent = Math.floor(res.data.clouds.all) + '%'

		})
		.catch(err => console.error(err))

	infoBoxDisplay.classList.remove('d-none')
}

const changeMode = () => {
	pageBody.classList.toggle('dark')
	cityLabel.classList.toggle('dark-text')
	for (item of weatherInfoData) {
		item.classList.toggle('dark-text')
	}
	for (item of unitHeading) {
		item.classList.toggle('dark-text')
	}
	if (pageBody.classList.contains('dark')) {
		darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>'
	} else {
		darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>'
	}
}

submitBtn.addEventListener('click', showWeather)
darkModeBtn.addEventListener('click', changeMode)