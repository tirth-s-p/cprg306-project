"use client";

import MainNavbar from "../components/MainNavbar";
import SecondaryNavbar from "../components/SecondaryNavbar";
import Footer from "../components/Footer";

export default function MonthlyPage() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <MainNavbar />
      <SecondaryNavbar />

      <div className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Monthly Forecast</h1>
        <p className="text-lg">Monthly weather trends and forecasts will be displayed here.</p>
      </div>

      <Footer />
    </div>
  );
}
