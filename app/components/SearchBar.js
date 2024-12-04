import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState(""); // Input field value
  const [suggestions, setSuggestions] = useState([]); // Suggestions list

  // Fetch suggestions for the city entered
  const fetchSuggestions = async (input) => {
    if (!input.trim()) {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }

    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const data = await res.json();
      setSuggestions(
        data.map((city) => ({
          name: city.name,
          state: city.state || "",
          country: city.country,
        }))
      );
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle the search action
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      onSearch(""); // Clear the city information if input is empty
      return;
    }

    onSearch(query); // Trigger the search function with the entered city
    setQuery(""); // Clear the search bar after search
    setSuggestions([]); // Clear suggestions
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center justify-center">
      {/* Magnifying Glass Icon */}
      <div className="p-2 bg-gray-100 border rounded-l flex items-center">
        <span className="text-gray-500">🔍</span>
      </div>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Address, City or Zip Code"
        className="p-2 border-t border-b border-gray-300 focus:outline-none w-full max-w-lg text-black placeholder-gray-500"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value); // Update query state with input value
          fetchSuggestions(e.target.value); // Fetch city suggestions
        }}
      />

      {/* Search Button */}
      <button
        type="submit"
        className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-orange-600"
      >
        Search
      </button>

      {/* Dropdown Suggestions */}
      {suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 bg-white border rounded shadow-lg w-full max-w-lg z-10">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-200 cursor-pointer text-black"
              onClick={() => {
                const cityName = `${city.name}, ${city.state}, ${city.country}`;
                setQuery(""); // Clear the input field after selecting a suggestion
                setSuggestions([]);
                onSearch(cityName); // Trigger search with the selected city
              }}
            >
              {city.name}
              {city.state ? `, ${city.state}` : ""}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
