import weatherAppDOM from './dom'
export default eventHandler

const searchBtn = document.querySelector('button#submit')
const loader = document.getElementById('loader')

function eventHandler() {
    const weatherDOM = weatherAppDOM()

    window.addEventListener('load', () => {
        hiderLoader()
        weatherDOM.createCurrentWeatherDOM()
    })

    searchBtn.addEventListener('click', async (e) => {
        showLoader()
        const location = document.querySelector('input').value
        e.preventDefault()

        weatherDOM.clearPage()
        await weatherDOM.displayWeatherDOM(location)
        hiderLoader()
    })

    function showLoader() {
        loader.style.display = 'initial'
        loader.showModal()
    }

    function hiderLoader() {
        loader.style.display = 'none'
        loader.close()
    }
}
