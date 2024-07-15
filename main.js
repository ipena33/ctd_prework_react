import './style.css'
 
import { getWeather } from "./weather"

// to have current timezone
 getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone).
 then(renderWeather)
//  .catch(e => {
//    console.error(e)
//    alert("Error getting weather.")
//  }
 )

 function renderWeather({current, daily, hourly }) {
   renderCurrentWeather(current)
  //  renderDailyWeather(daily)
  //  renderHourlyWeather(hourly)
   document.body.classList.remove("blurred")
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