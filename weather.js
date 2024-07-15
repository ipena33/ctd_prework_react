import axios from "axios"

export function getWeather(lat, lon, timezone) {

   return axios.get(
        "https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timeformat=unixtime", 
        {
            params : {
                latitude: lat,
                longitude: lon,
                timezone,
            },
        }
    )
    .then(({ data }) => {
        return {
            current: parseCurrentWeather(data),
            daily:  parseDailyWeather(data),
            hourly: parseHourlyWeather(data)
        }
    }
    )
}

function parseCurrentWeather ({ current, daily}) {
    const { 
        // temperature: temperature_2m,
        // windspeed: windSpeed, 
        // weathercode: iconCode } = current
        temperature_2m: temperature,
        wind_speed_10m: windspeed, 
        weather_code: iconCode } = current
    const {
        temperature_2m_max: [maxTemp],
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip],
    } = daily

    return {
        temperature : Math.round(temperature),
        highTemp: Math.round(maxTemp),
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike),
        lowFeelsLike: Math.round(minFeelsLike),
        windspeed: Math.round(windspeed),
        precip: Math.round(precip *100)/100,
        iconCode,
    }
    
}

function parseDailyWeather({ daily}) {
    return daily.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: daily.weather_code[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        }
    })
    
}

function parseHourlyWeather({ hourly, current}) {
    return hourly.time.map((time, index) => {
        return {
            timestamp: time * 1000,
            iconCode: hourly.weather_code[index],
            temp: Math.round(hourly.temperature_2m[index]),
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windspeed: Math.round(hourly.wind_speed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) /100,
        }
    }
    )
}