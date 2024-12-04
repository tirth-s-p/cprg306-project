import Link from "next/link";

export default function SecondaryNavbar() {
  return (
    <nav className="bg-gray-100 p-4 flex justify-center space-x-4">
      <Link href="/" className="text-gray-700 hover:text-blue-500">
        Today
      </Link>
      <Link href="/hourly" className="text-gray-700 hover:text-blue-500">
        Hourly
      </Link>
      <Link href="/5-day" className="text-gray-700 hover:text-blue-500">
        5-Day
      </Link>
      <Link href="/monthly" className="text-gray-700 hover:text-blue-500">
        Monthly
      </Link>
    </nav>
  );
}
