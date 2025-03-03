import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";

const customIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ country }) => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  if (!country || !country.latlng || country.latlng.length < 2) {
    return <p>No location data available</p>;
  }

  const position = [country.latlng[0], country.latlng[1]];

  // Fetch country borders from the online GeoJSON file
  useEffect(() => {
    const fetchCountryBorders = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/datasets/geo-boundaries-world-110m/master/countries.geojson");
        if (!response.ok) throw new Error("Failed to load GeoJSON");
        const data = await response.json();
  
        // Debug: Log the first country's properties
        if (data.features.length > 0) {
          console.log("First country properties:", data.features[0].properties);
        } else {
          console.warn("No features found in the GeoJSON file.");
        }
  
        if (!country || !country.name || !country.name.common) {
          console.warn("Country name is missing:", country);
          return;
        }
  
        // 🔥 Match country by name using 'sovereignt' and 'NAME'
        const countryGeoJson = data.features.find(
          (feature) => feature.properties.sovereignt.toLowerCase() === country.name.common.toLowerCase()
        );
  
        if (countryGeoJson) {
          setGeoJsonData(countryGeoJson);
        } else {
          console.warn(`Country borders not found for ${country.name.common}`);
        }
      } catch (error) {
        console.error("Error fetching country boundaries:", error);
      }
    };
  
    fetchCountryBorders();
  }, [country]);
  
  
  
  
  return (
    <MapContainer center={position} zoom={5} style={{ height: "400px", width: "100%" , border: "2px solid #04cceb"}} >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      <Marker position={position} icon={customIcon}>
        <Popup>{country.name.common}</Popup>
      </Marker>

      {geoJsonData ? (
        <GeoJSON
          data={geoJsonData}
          style={() => ({
            color: "red", // Border color
            weight: 2,
            opacity: 0.8,
            fillColor: "transparent", // Only border
          })}
        />
      ) : (
        <p style={{ color: "red", textAlign: "center" }}>Country borders not found</p>
      )}
    </MapContainer>
  );
};

export default MapComponent;
