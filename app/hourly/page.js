"use client";

import MainNavbar from "../components/MainNavbar";
import SecondaryNavbar from "../components/SecondaryNavbar";
import Footer from "../components/Footer";

export default function HourlyPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <MainNavbar />
      <SecondaryNavbar />

      <div className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Hourly Forecast</h1>
        <p className="text-lg">Hourly weather forecast will be displayed here.</p>
      </div>

      <Footer />
    </div>
  );
}
