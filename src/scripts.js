export default weatherData

const weatherKeys = process.env.WEATHER_API_KEY
const gifKeys = process.env.GIF_API_KEY

function weatherData() {
    //a function that get weather data
    //since this function will take time so it needs to be an async function
    //for practice purpose, this function will use the promise then approach
    function getWeatherData(locationInput) {
        const location = locationInput
        return fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${weatherKeys}`,
            { mode: 'cors' }
        )
            .then((response) => {
                return response.json()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    //Data from getWeatherData() function is in JSON format
    //so a function is required to extract and process the data
    async function processWeatherData(location) {
        try {
            let weatherData = await getWeatherData(location)
            console.log(weatherData)

            const current = {
                currentAddress: weatherData.resolvedAddress,
                currentTemp: weatherData.currentConditions.temp,
                currentCondition: weatherData.currentConditions.conditions,
                currentTempHigh: weatherData.days[0].tempmax,
                currentTempLow: weatherData.days[0].tempmin,
                currentIcon: weatherData.currentConditions.icon,
            }

            const hourlyData = weatherData.days[0].hours.filter(
                (hourDataObj) =>
                    hourDataObj.datetime >
                    weatherData.currentConditions.datetime
            )

            const hourly = {
                hourlyTime: hourlyData.map((arr) => arr.datetime),
                hourlyIcon: hourlyData.map((arr) => arr.icon),
                hourlyTemp: hourlyData.map((arr) => arr.temp),
            }

            const dailyData = weatherData.days.slice(1, 6)
            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ]

            const daily = {
                dailyDate: dailyData.map(
                    (arr) => days[new Date(arr.datetime).getDay()]
                ),
                dailyIcon: dailyData.map((arr) => arr.icon),
                dailyTempMax: dailyData.map((arr) => arr.tempmax),
                dailyTempMin: dailyData.map((arr) => arr.tempmin),
            }
            return { current, hourly, daily }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        getWeatherData,
        processWeatherData,
    }
}
