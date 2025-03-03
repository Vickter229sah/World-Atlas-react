import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";  // Import PropTypes for validation

const HotelList = ({ cityName }) => {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cityName) return; // No need to fetch if no city name is provided

    setLoading(true);
    setError(null);

    // Example Amadeus API call to fetch hotels by city code
    axios
      .get(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${encodeURIComponent(
          cityName
        )}`,
        {
          headers: {
            Authorization: `Bearer a5TLkUxA4zWxtivKMzyb0FRNtc4Y`, // Use the token you obtained
          },
        }
      )
      .then((response) => {
        if (response.data) {
          setHotels(response.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching hotels:", err);
        setError("Failed to fetch hotels");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cityName]);

  if (loading) {
    return <p>Loading hotels...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Hotels in {cityName}</h2>
      {hotels.length > 0 ? (
        <ul>
          {hotels.map((hotel, index) => (
            <li key={index}>
              <h3>{hotel.name}</h3>
              <p>📍 Location: {hotel.location.latitude}, {hotel.location.longitude}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels found in {cityName}</p>
      )}
    </div>
  );
};

// Adding prop validation for 'cityName'
HotelList.propTypes = {
  cityName: PropTypes.string.isRequired,  // 'cityName' should be a string and is required
};

export default HotelList;
