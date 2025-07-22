//entry file

import weatherData from './scripts'
import weatherAppDOM from './dom'

const weather = weatherData()
const weatherDOM = weatherAppDOM()

weatherDOM.displayCurrentWeather()
