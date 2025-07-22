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
    const weeklyWeatherDiv = document.querySelector('div.weekly-weather')

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

    async function displayCurrentWeatherInfo() {
        let currentWeather
        try {
            currentWeather = await weather.processCurrentWeatherData()
            console.log(currentWeather)
            const allCurrentP = document.querySelectorAll(
                'div.current-weather p'
            )
            allCurrentP.forEach((p, index) => {
                p.textContent = Object.values(currentWeather)[index]
            })
        } catch (error) {
            console.error(error)
        }
    }

    return {
        createCurrentWeatherDOM,
        displayCurrentWeatherInfo,
    }
}
