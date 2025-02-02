import React,{ useState, useEffect} from "react";
import { getUserLocation } from "../../utils/userLocation";
import styles from './Weather.module.css'
import Clock from '../clock/Clock';

export default function Weather() {
    const [ location, setLocation ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ weatherData, setWeatherData ] = useState(null);

    async function fetchWeather(lat, lon) {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`
        
        try {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Failed to fetch weather data");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        getUserLocation()
            .then((coords) => {
                setLocation(coords);
            })
            .catch((error) => {
                setError(error);
            })
    }, []);

    useEffect(() => {
        if (location) {
            fetchWeather(location.latitude, location.longitude);

            const interval = setInterval(() => {
                fetchWeather(location.latitude, location.longitude)
            }, 60000);

            return () => clearInterval(interval);
        }
    }, [location]);

    if (error) {
        return <div>error</div>
    }

    if (!location) {
        return <div>...</div>
    }

    if (!weatherData) {
        return <div>no data</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.weatherContainer}>
                <h1>Weather</h1>
                <h2>Location and Time:</h2>
                <div className={styles.locationData}>
                    <ul>
                        <li><strong>City:</strong> {weatherData.location.name}</li>
                        <li><strong>State:</strong> {weatherData.location.region}</li>
                        <li><strong>Country:</strong> {weatherData.location.country}</li>
                        <li><strong>Latitude:</strong> {weatherData.location.lat}</li>
                        <li><strong>Longitude:</strong> {weatherData.location.lon}</li>
                        <li><strong>Time Zone:</strong> {weatherData.location.tz_id}</li>
                    </ul>
                    <Clock />
                </div>
                <h2>Temperature and More:</h2>
                <div className={styles.temp}>
                    <ul>
                        <li><strong>Temperature: </strong> {weatherData.current.temp_f}</li>
                        <li><strong>Feels Like: </strong>{weatherData.current.feelslike_f}</li>
                        <li><strong>Dew Point: </strong>{weatherData.current.dewpoint_f}</li>
                        <li><strong>Condition: </strong>{weatherData.current.condition.text}</li>
                        <li><strong>Wind (mph): </strong>{weatherData.current.wind_mph}</li>
                        <li><strong>Wind Degree: </strong>{weatherData.current.wind_degree}</li>
                        <li><strong>Air Pressure (in): </strong>{weatherData.current.pressure_in}</li>
                        <li><strong>Humidity: </strong>{weatherData.current.humidity}</li>
                        <li><strong>Precipitation: </strong>{weatherData.current.precip_in}</li>
                        <li><strong>Cloud (%): </strong>{weatherData.current.cloud}</li>
                        <li><strong>Heat Index: </strong>{weatherData.current.heatindex_f}</li>
                        <li><strong>Wind Chill: </strong>{weatherData.current.windchill_f}</li>
                        <li><strong>Visibility (miles): </strong>{weatherData.current.vis_miles}</li>
                        <li><strong>Wind Gust (mph): </strong>{weatherData.current.gust_mph}</li>
                    </ul>
                    <img src={weatherData.current.condition.icon} alt="not loading" className={styles.weatherIcon}/>
                </div>
            </div>
        </div>
    )
}