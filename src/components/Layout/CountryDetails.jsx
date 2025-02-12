import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import axios from "axios";

const CountryDetails = () => {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Keep track of loading state

  useEffect(() => {
    if (!name) return; 

    setLoading(true); // Set loading to true when the request is initiated

    axios
      .get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`)
      .then((response) => {
        if (response.data.length > 0) {
          setCountry(response.data[0]);
          setError(null); // Reset any previous errors
        } else {
          setError("Country not found");
        }
      })
      .catch((err) => {
        console.error("Error fetching country details:", err);
        setError("Error fetching country details");
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is finished
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
                  <span className="card-description">Native Names:</span>
                  {Object.keys(country.name.nativeName)
                    .map((key) => country.name.nativeName[key].common)
                    .join(", ")}
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
                  <span className="card-description">Sub Region:</span>
                  {country.subregion}
                </p>
                <p>
                  <span className="card-description">Capital:</span>
                  {country.capital?.[0] || "N/A"}
                </p>
                <p>
                  <span className="card-description">Top Level Domain:</span>
                  {country.tld?.[0] || "N/A"}
                </p>
                <p>
                  <span className="card-description">Currencies:</span>
                  {Object.keys(country.currencies)
                    .map((curElem) => country.currencies[curElem].name)
                    .join(", ")}
                </p>
                <p>
                  <span className="card-description">Languages:</span>
                  {Object.keys(country.languages)
                    .map((key) => country.languages[key])
                    .join(", ")}
                </p>
                <p>
                  <span className="card-description">Area:</span>
                  {country.area.toLocaleString()} square kilometers
                </p>
              </div>
            </div>
          </div>
        )}
      <div className="country-card-backBtn">
        <NavLink to="/country" className="backBtn">
          <button>Go Back</button>
        </NavLink>
      </div>
      </div>
    </section>
  );
};

export default CountryDetails;

