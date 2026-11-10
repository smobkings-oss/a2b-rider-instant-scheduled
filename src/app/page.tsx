import Link from "next/link";
import { Car, Clock, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="relative px-6 py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black opacity-90" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gold-text">A2B</span> Rides
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Premium rides. Instant or scheduled. Better pay for drivers. Local to NW Ohio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ride"
              className="bg-gold text-black font-bold px-8 py-4 rounded-lg hover:bg-yellow-500 transition"
            >
              Book Instant Ride
            </Link>
            <Link
              href="/ride?mode=scheduled"
              className="border-2 border-gold text-gold font-bold px-8 py-4 rounded-lg hover:bg-gold/10 transition"
            >
              Schedule a Ride
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div className="holographic-border p-1">
          <div className="bg-black p-6 rounded-lg h-full">
            <Car className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-2xl font-bold mb-2">Instant Rides</h3>
            <p className="text-gray-400">Hop on now. Drivers nearby in Toledo, Perrysburg & beyond.</p>
          </div>
        </div>
        <div className="holographic-border p-1">
          <div className="bg-black p-6 rounded-lg h-full">
            <Clock className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-2xl font-bold mb-2">Scheduled</h3>
            <p className="text-gray-400">Book ahead for airports, events, or early mornings.</p>
          </div>
        </div>
        <div className="holographic-border p-1">
          <div className="bg-black p-6 rounded-lg h-full">
            <Shield className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-2xl font-bold mb-2">Safe & Transparent</h3>
            <p className="text-gray-400">Live tracking, upfront pricing, Tesla fleet options.</p>
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-gray-500 border-t border-gray-800">
        A2B Rides • NW Ohio • Driver-First Platform
      </footer>
    </main>
  );
}
