import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Search = ({value, onChange})=> <label>find countries: <input value={value} onChange={onChange} /></label>
const SingleCountry = ({country, handleShowClick})=> <p>{country.name.common}<button onClick={()=>handleShowClick(country)}>Show</button></p>
const CountryInfos = ({country})=>{
  const [weatherData, setWeatherData] = useState(null)
  const languagesElements = Object.values(country.languages).map((language)=><li key={language}>{language}</li>)
   useEffect(()=>{
    weatherService
      .getTempAndWind(country.capital[0])
      .then(data=> setWeatherData(data))
   }, [])
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital[0]}</p>
      <p>area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {languagesElements}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width="200"/>
      <h3>Wheather in {country.capital[0]}</h3>
      {weatherData?
        <>
          <p>temperature {(weatherData.main.temp - 273.15).toFixed(2)} Celcius</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
          <p>wind {weatherData.wind.speed} m/s</p>      
        </>
        :
        <h3>Loading...</h3>
      }
    </div>
  )
}
const ContriesList = ({countries, handleShowClick})=>{
  let toRender
  if(countries.length ===0) toRender= <p>Nothing found</p>
  else if(countries.length > 10) {toRender = <p>Too many matches, specify another filter</p>}
  else if(countries.length ===1) {toRender = <CountryInfos country={countries[0]}/> }
  else {toRender = countries.map((country)=> <SingleCountry key={country.name.common} country={country} handleShowClick={handleShowClick}/>)}
  return(
    <div>
      {toRender}
    </div>
  )
}
function App() {
  const [searchInput, setSearchInput] = useState('')
  const [countries, setCountries] = useState(null)
  const [filtredCountries, setFeltredCountries] = useState([])
  const handleOnChange = (event)=>{
    const targetValue = event.target.value
    const newCountries = []
    if(targetValue.length){
      countries.forEach((country)=> {
        if(country.name.common.toLowerCase().includes(targetValue.toLowerCase())) newCountries.push(country)
      })
    }
    setSearchInput(targetValue)
    setFeltredCountries(newCountries)

  }
  const handleShowClick = (county)=>{
    setFeltredCountries([county])
  }
  useEffect(()=>{
    countryService
      .getAll()
      .then((data)=>{
        setCountries(data)
      })
  },[])
  return (
    <>
      {countries? 
        <div>
          <Search value = {searchInput} onChange= {handleOnChange}/>
          <ContriesList countries={filtredCountries} handleShowClick={handleShowClick}/> 
        </div>
        :
        <h1>Waiting for data...</h1>
      
    }
    </>
  )
}

export default App
