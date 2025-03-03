import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import axios from "axios";
import MapComponent from "./MapComponent";
import WeatherComponent from "./WeatherComponent";
import HotelList from "../../Pages/HotelList"; // Import the HotelList component

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) return;

    setLoading(true);

    // Fetch country details using restcountries API
    axios
      .get(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setCountry(response.data[0]);
          setError(null);
        } else {
          setError("Country not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching country details:", err);
        setError("Error fetching country details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return (
      <div className="loader-container">
        <DotLoader color="#10a0bf" size={80} />
      </div>
    );
  }

  if (error) {
    return <p>⚠️ {error}</p>;
  }

  // Get the capital city name
  const capitalCity = country.capital?.[0] || "";

  return (
    <section className="card country-details-card container">
      <div className="container-card bg-white-box">
        {country && (
          <div className="country-image grid grid-two-cols">
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="flag"
            />
            <div className="country-content">
              <p className="card-title">{country.name.common}</p>
              <div className="infoContainer">
                <p>
                  <span className="card-description">Capital:</span>
                  {capitalCity || "N/A"}
                </p>
                <p>
                  <span className="card-description">Population:</span>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <span className="card-description">Region:</span>
                  {country.region}
                </p>
                <p>
                  <span className="card-description">Languages:</span>
                  {Object.values(country.languages).join(", ")}
                </p>
                <p>
                  <span className="card-description">Area:</span>
                  {country.area.toLocaleString()} km²
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="country-map">
        <h3>Weather</h3>
        <div className="country-container">
          <div className="weather-container">
            <h1>{country.name.common}</h1>
            <WeatherComponent capital={capitalCity} />
          </div>
        </div>
        <h3>Location on the Map</h3>
        <MapComponent country={country} />
      </div>

      {/* ✅ Fetch hotels by capital city instead of country name */}
      {capitalCity && <HotelList cityName={capitalCity} />}

      <div className="country-card-backBtn">
        <NavLink to="/country" className="backBtn">
          <button>Go Back</button>
        </NavLink>
      </div>
    </section>
  );
};

export default CountryDetails;
