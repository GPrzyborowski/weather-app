const darkModeBtn = document.querySelector('.nav__dark-mode')
const pageBody = document.querySelector('body')
const weatherInfoData = document.querySelectorAll('.weather-info__data')
const infoBoxDisplay = document.querySelector('.info-box')
const cityLabel = document.querySelector('.container__city-label')
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
	if (input.value != '') {
		if (input.classList.contains('empty-input')) {
			input.classList.remove('empty-input')
			input.removeAttribute('placeholder')
		}
		const city = input.value
		cityLabel.textContent = `Showing the weather for ${city}`

		if (metricUnit.checked) {
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

				if (localHour < 10 && minutes < 10) {
					time.textContent = `0${localHour}:0${minutes}`
				} else if (localHour < 10 && minutes >= 10) {
					time.textContent = `0${localHour}:${minutes}`
				} else if (localHour >= 10 && minutes < 10) {
					time.textContent = `${localHour}:0${minutes}`
				} else {
					time.textContent = `${localHour}:${minutes}`
				}

				if (metricUnit.checked) {
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

		input.value = ''
		infoBoxDisplay.classList.remove('d-none')
	} else {
		input.classList.add('empty-input')
		input.setAttribute('placeholder', 'Provide the city name')
	}
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

input.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		showWeather()
	}
})
submitBtn.addEventListener('click', showWeather)
darkModeBtn.addEventListener('click', changeMode)
