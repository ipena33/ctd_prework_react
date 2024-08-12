import './style.css'
 
import { getWeather } from "./weather"

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

// to have current timezone
 function positionSuccess({ coords }) {
  getWeather(coords.latitude, coords.longitude, Intl.DateTimeFormat().resolvedOptions().timeZone)
    .then(renderWeather)
//     .catch(e => {
//       console.error(e)
//       alert("Error getting weather.")
//     }
//  )
 }

 function positionError() {
   alert("There was an error getting your location. Allow location in your browser first and refresh your page.")
 }



 function renderWeather({current, daily, hourly }) {
   renderCurrentWeather(current)
  //  renderDailyWeather(daily)
  //  renderHourlyWeather(hourly)
 }


function setValue(selector, value, { parent = document} = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
  
}
//  const currentIcon = document.querySelector("[data-current-icon]")
 function renderCurrentWeather(current) { 
   setValue("current-temp", current.temperature)
   setValue("current-high", current.highTemp)
   setValue("current-low", current.lowTemp)
   setValue("current-fl-high", current.highFeelsLike)
   setValue("current-fl-low", current.lowFeelsLike)
   setValue("current-windspeed", current.windspeed)
   setValue("current-precip", current.precip)
 }