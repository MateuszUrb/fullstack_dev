import { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import { BASE_URL } from "./api";

function App() {
  const [countries, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/all`)
      .then((res) => {
        setCountry(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error while fetchig countries: ${err.message}`);
        setError("Failed to load countrie, try again later");
        setLoading(false);
      });
  }, []);

  const filteredCountries = countries?.filter((country) =>
    country.name.common.toLowerCase().includes(countryName.toLowerCase()),
  );

  function handleCountryName(e) {
    setCountryName(e.target.value);
  }

  return (
    <>
      <div>
        <label>
          find countries:
          <input
            value={countryName}
            onChange={handleCountryName}
            placeholder="search countries"
          />
        </label>
      </div>
      {error && <p>Error: {error}</p>}
      {loading && !error && <h1>Loading countries to search</h1>}
      {!loading && !error && countryName.length > 0 && (
        <Country countries={filteredCountries} />
      )}
    </>
  );
}

export default App;
