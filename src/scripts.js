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
    async function processCurrentWeatherData() {
        try {
            let weatherData = await getWeatherData('Kowloon Bay')
            console.log(weatherData)
            return {
                address: weatherData.resolvedAddress,
                currentTemp: weatherData.currentConditions.temp,
                condition: weatherData.currentConditions.conditions,
                tempHigh: weatherData.days[0].tempmax,
                tempLow: weatherData.days[0].tempmin,
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function processFutureWeatherData() {
        const weatherDataJSON = await getWeatherData()
        //An array of all entries for hourly forecast data that is ahead of current time
        //Will show time, icon, and temperature for simplicity
        const currentTime = weatherDataJSON.currentConditions.datetime
        const hourlyDataArr = weatherDataJSON.days[0].hours.filter(
            (hour) => hour.datetime > currentTime
        )
        //An array of 5 entries ahead of current day
        //Will just show date, icon, temp max and min
        const dailyDataArr = weatherDataJSON.days.slice(1, 6)
    }

    return {
        getWeatherData,
        processCurrentWeatherData,
        processFutureWeatherData,
    }
}
