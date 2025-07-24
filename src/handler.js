import weatherAppDOM from './dom'
export default eventHandler

const searchBtn = document.querySelector('button#submit')

function eventHandler() {
    const weatherDOM = weatherAppDOM()

    window.addEventListener('load', weatherDOM.createCurrentWeatherDOM)

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const location = document.querySelector('input').value
        weatherDOM.displayCurrentWeatherInfo(location)
    })
}
