import localFont from "next/font/local";
import "./globals.css";

// Import Geist Sans Font
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900", // Minimum and maximum weight
});

// Import Geist Mono Font
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900", // Minimum and maximum weight
});

// Metadata for the app
export const metadata = {
  title: "WeatherWise",
  description: "Accurate Weather Forecasts for Any Location",
};

// Root Layout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Optional: Add a favicon or additional metadata */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}
