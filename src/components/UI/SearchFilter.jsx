import { FaSearch } from "react-icons/fa"; // Import search icon

export const SearchFilter = ({
  search,
  setSearch,
  filter,
  setFilter,
  countries,
  setCountries
}) => {

  // Handle search input change
  const handlerInputChange = (event) => {
    setSearch(event.target.value);  // Update search state
  };

  // Handle filter select change
  const handlerSelectChange = (event) => {
    setFilter(event.target.value);  // Update filter state
  };

  // Handle sorting of countries
  const sortCountries = (value) => {
    const sortedCountries = [...countries].sort((a, b) => {
      return value === "asc"
        ? a.name.common.localeCompare(b.name.common)  // Ascending sort
        : b.name.common.localeCompare(a.name.common); // Descending sort
    });
    setCountries(sortedCountries);  // Update countries with sorted data
  };

  return (
    <section className="section-searchFilter container">
      {/* Search Input with Icon */}
      <div className="search-box">
        <FaSearch className="search-icon" /> {/* Search Icon */}
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handlerInputChange}  // Calls handler on input change
        />
      </div>

      {/* Sorting buttons */}
      <div>
        <button onClick={() => sortCountries("asc")}>Asc</button>
      </div>
      <div>
        <button onClick={() => sortCountries("desc")}>Desc</button>
      </div>

      {/* Filter dropdown */}
      <div>
        <select
          className="select-section"
          value={filter}
          onChange={handlerSelectChange}  // Calls handler on filter change
        >
          <option value="all">All</option>
          <option value="Africa">Africa</option>
          <option value="Asia">Asia</option>
          <option value="Americas">Americas</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </section>
  );
};
