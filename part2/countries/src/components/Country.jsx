import axios from "axios";
import { useEffect, useState } from "react";
import { WEATHER_URL, WEATHER_ICON, API } from "../api";

const countryStyle = {
  margin: 3,
  display: "inline-block",
};
export default function Country({ countries }) {
  const [country, setCountry] = useState(null);

  function handleShow(country) {
    setCountry([country]);
  }

  if (country) {
    return <CountryDetails countries={country} />;
  }
  if (countries.length === 1) {
    return <CountryDetails countries={countries} />;
  }
  if (countries.length < 10) {
    return countries.map((country) => (
      <div key={country.cca3}>
        <p style={countryStyle} key={country.cca3}>
          {country.name.official}
        </p>
        <button onClick={() => handleShow(country)}>show</button>
      </div>
    ));
  }

  return <p>Too many matches, specify another filter</p>;
}

function CountryDetails({ countries }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const country = countries[0];
  const name = country.name.common;

  useEffect(() => {
    function getWeather() {
      axios
        .get(`${WEATHER_URL}${name}&units=metric&appid=${API}`)
        .then((res) => {
          setWeather(res.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    }

    getWeather();
  }, [name]);

  return (
    <div key={country.cca3}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital || "NONE"}</p>
      <p>area {country.area} km²</p>
      {country.languages && (
        <>
          <h2>languages</h2>
          <ul>
            {Object.values(country.languages).map((lang, idx) => (
              <li key={idx}>{lang}</li>
            ))}
          </ul>
        </>
      )}
      <img src={country.flags.png} alt={`Flog of ${country.name.common}`} />
      {!weather && error && (
        <div>
          <p>Error while fetching weather</p>
          <em>{error}</em>
        </div>
      )}
      {weather ? (
        <div>
          <h3>Weahter in {name}</h3>
          <p>temperature {weather.main.temp} Celcius</p>
          <img
            src={`${WEATHER_ICON}${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>loading weather</p>
      )}
    </div>
  );
}
