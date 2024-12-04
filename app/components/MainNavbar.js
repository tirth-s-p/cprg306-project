import { useState } from "react";
import SearchBar from "./SearchBar";

export default function MainNavbar({ onSearch }) {
  return (
    <div className="bg-black text-white p-4 flex justify-between items-center">
      {/* Left Section: Project Name */}
      <div className="flex items-center space-x-2">
        <span className="text-orange-500 font-bold text-2xl">☀</span>
        <h1 className="text-xl font-bold">WeatherWise</h1>
      </div>

      {/* Center Section: Search Bar */}
      <div className="flex-grow mx-8">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Right Section (Removed "Search Results") */}
    </div>
  );
}
