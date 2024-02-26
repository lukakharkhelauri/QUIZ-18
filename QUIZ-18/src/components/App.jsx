import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import classes from '../modules/index.module.scss'

function App() {
  const [weatherData, setWeatherData] = useState({
    input:'',
    weather:'',
    error:null,
  });

  const handleInputChange = (e) => {
    setWeatherData({
      ...weatherData,
      input:e.target.value,
    })
  }

  const getWeather = () => {
    const apiKey = '258b669778e0a53bfbb5e14d4dd25772'

    axios
      .get('http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=258b669778e0a53bfbb5e14d4dd25772')
        .then((response) => {
          setWeatherData({
            input: weatherData.input,
            weather: {
              description: response.data.weather[0].description,
              humidity: response.data.main.humidity,
              windSpeed: response.data.wind.speed
            }
          })
        })
  }

  return (
    <>
      <div className={classes['container']}>
        <div className={classes['centered-box']}>
          <input type='text' placeholder='Enter your country' className={classes['search-bar']} value={weatherData.input} onChange={handleInputChange} />
          <button onClick={getWeather}>Get weather</button>
          {weatherData.error && <p className={classes['error-message']}>{weatherData.error}</p>}
          {weatherData.weather && (
            <div className={classes['weather-info']}>
              <p>{`weather: ${weatherData.weather.description}`}</p>
              <p>{`weather: ${weatherData.weather.windSpeed}`}</p>
              <p>{`weather: ${weatherData.weather.humidity}`}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
