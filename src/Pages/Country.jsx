import { useEffect, useState, useTransition } from "react";
import axios from "axios"; // Import axios for API requests
import { DotLoader } from "react-spinners";
import { CountryCard } from "../components/Layout/countryCard";
import { SearchFilter } from "../components/UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [loading] = useState(true);
  const [search, setSearch] = useState(""); // Initialize search as an empty string
  const [filter, setFilter] = useState("all");

  // Function to fetch country data
  const getCountryData = async () => {
    try {
      const res = await axios.get("https://restcountries.com/v3.1/all"); // Replace with your actual API URL
      return res.data;
    } catch (error) {
      console.error("Error fetching country data:", error);
      return [];
    }
  };

  useEffect(() => {
    startTransition(async () => {
      const data = await getCountryData();
      setCountries(data);
    });
  }, []);

  if (isPending) return <div className={`loader-container ${loading ? "" : "fade-out"}`}>
    <DotLoader color="#10a0bf" size={80} />
  </div>;

  // Filtering and searching logic
  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  };

  const filterRegion = (country) => {
    if (filter === "all") return true;
    return country.region === filter;
  };

  const filterCountries = countries.filter((country) => searchCountry(country) && filterRegion(country));

  return (
    <section className="country-section">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      <ul className="grid grid-four-cols">
        {filterCountries.map((curCountry, index) => (
          <CountryCard country={curCountry} key={index} />
        ))}
      </ul>
    </section>
  );
};
