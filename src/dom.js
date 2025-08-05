import weatherData from './scripts'
export default weatherAppDOM
//List of items I need to display for the weather app
//1. Address for now
//2. Temperature for now
//3. Weather Conditions for now
//4. High and Low for today
//5. Hourly forecast for today
//6. 5 days of future forecast

//The idea is to have the basic DOM displayed (e.g., the box with colored background) before data is fetched from the API
//therefore

function weatherAppDOM() {
    const weather = weatherData()
    const currentWeatherDiv = document.querySelector('div.current-weather')
    const hourlyWeatherDiv = document.querySelector('div.hourly-weather')
    const daillyWeatherDiv = document.querySelector('div.daily-weather')

    //for current weather, we know what info to know so we first create the DOM element, then display the data
    function createCurrentWeatherDOM() {
        const address = document.createElement('p')
        address.id = 'current-address'

        const temp = document.createElement('p')
        temp.id = 'current-temp'

        const condition = document.createElement('p')
        condition.id = 'current-condition'

        const maxTemp = document.createElement('p')
        maxTemp.id = 'current-max-temp'

        const minTemp = document.createElement('p')
        minTemp.id = 'current-min-temp'

        currentWeatherDiv.append(address, temp, condition, maxTemp, minTemp)
    }

    //It is unknown how many data container to create so need to see how many hours of data we get first
    async function displayWeatherDOM(location) {
        let processedWeatherData
        try {
            processedWeatherData = await weather.processWeatherData(location)

            const allCurrent = document.querySelectorAll(
                'div.current-weather p'
            )
            allCurrent.forEach((p, index) => {
                p.textContent += Object.values(processedWeatherData.current)[
                    index
                ]
            })

            //hourly weather data
            const hourlyTimeArr = processedWeatherData.hourly.hourlyTime
            const hourlyIconArr = processedWeatherData.hourly.hourlyIcon
            const hourlyTempArr = processedWeatherData.hourly.hourlyTemp
            const hourlyDataArrLength = hourlyTimeArr.length

            for (let i = 0; i < hourlyDataArrLength; i++) {
                const infoBox = document.createElement('div')
                infoBox.setAttribute('class', 'hourly-info')

                const time = document.createElement('p')
                time.textContent += hourlyTimeArr[i]

                const { default: iconUrl } = await import(
                    `./assets/WeatherIcons/PNG/1st Set - Color/${hourlyIconArr[i]}.png`
                )
                const iconBox = document.createElement('p')
                const icon = document.createElement('img')
                iconBox.appendChild(icon)
                icon.src = iconUrl

                const temp = document.createElement('p')
                temp.textContent += hourlyTempArr[i]

                infoBox.append(time, iconBox, temp)
                hourlyWeatherDiv.appendChild(infoBox)
            }

            //daily weather data
            const dailyDateArr = processedWeatherData.daily.dailyDate
            const dailyIconArr = processedWeatherData.daily.dailyIcon
            const dailyTempMaxArr = processedWeatherData.daily.dailyTempMax
            const dailyTempMinArr = processedWeatherData.daily.dailyTempMin
            const dailyTimeArrLength = dailyDateArr.length

            for (let j = 0; j < dailyTimeArrLength; j++) {
                const infoBox = document.createElement('div')
                infoBox.setAttribute('class', 'daily-info')

                const date = document.createElement('p')
                date.textContent += dailyDateArr[j]

                const { default: iconUrl } = await import(
                    `./assets/WeatherIcons/PNG/1st Set - Color/${dailyIconArr[j]}.png`
                )
                const iconBox = document.createElement('p')
                const icon = document.createElement('img')
                iconBox.appendChild(icon)
                icon.src = iconUrl

                const tempMax = document.createElement('p')
                tempMax.textContent += dailyTempMaxArr[j]

                const tempMin = document.createElement('p')
                tempMin.textContent += dailyTempMinArr[j]

                infoBox.append(date, iconBox, tempMax, tempMin)
                daillyWeatherDiv.appendChild(infoBox)
            }
        } catch (error) {
            // console.error(error)
        }
    }

    function clearPage() {
        const allCurrentInfo = currentWeatherDiv.querySelectorAll('p')

        allCurrentInfo.forEach((p) => {
            p.textContent = ''
        })
        hourlyWeatherDiv.textContent = ''

        daillyWeatherDiv.textContent = ''
    }

    return {
        createCurrentWeatherDOM,
        displayWeatherDOM,
        clearPage,
    }
}
