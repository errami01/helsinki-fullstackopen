import axios from "axios";

const api_key = import.meta.env.VITE_WEATHER_API_KEY
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const getTempAndWind = (city)=> axios(`${baseUrl}q=${city}&appid=${api_key}`)
.then(response=> response.data)

export default {getTempAndWind}