import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <div className="bg-white flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">About This App</h1>
        <p className="text-lg">
          CPRG306 Weather App provides real-time weather updates and a 5-day
          forecast for cities worldwide. Built with Next.js and OpenWeatherMap API.
        </p>
      </div>
      <Footer />
    </div>
  );
}
