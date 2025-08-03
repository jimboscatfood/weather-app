import weatherAppDOM from './dom'
export default eventHandler

const searchBtn = document.querySelector('button#submit')

function eventHandler() {
    const weatherDOM = weatherAppDOM()

    window.addEventListener('load', () => {
        weatherDOM.createCurrentWeatherDOM()
    })

    searchBtn.addEventListener('click', (e) => {
        const location = document.querySelector('input').value
        e.preventDefault()

        weatherDOM.clearPage()
        weatherDOM.displayWeatherInfo(location)
        weatherDOM.createHourlyWeatherDOM(location)
    })
}
