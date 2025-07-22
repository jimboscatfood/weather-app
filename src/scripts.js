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
            return {
                currentAddress: weatherData.resolvedAddress,
                currentTemp: weatherData.currentConditions.temp,
                currentCondition: weatherData.currentConditions.conditions,
                currentTempHigh: weatherData.days[0].tempmax,
                currentTempLow: weatherData.days[0].tempmin,
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        getWeatherData,
        processCurrentWeatherData,
    }
}
