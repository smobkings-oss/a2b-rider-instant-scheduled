"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { MapPin, Clock, Car, CreditCard } from "lucide-react";

export default function RidePage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "instant";
  const [isScheduled, setIsScheduled] = useState(mode === "scheduled");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [estimate, setEstimate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsScheduled(mode === "scheduled");
  }, [mode]);

  const calculateEstimate = () => {
    if (!pickup || !dropoff) return;
    setLoading(true);
    setTimeout(() => {
      const base = isScheduled ? 12 : 8;
      const dist = Math.random() * 15 + 5;
      setEstimate(Math.round((base + dist * 1.8) * 100) / 100);
      setLoading(false);
    }, 800);
  };

  const handleRequest = async () => {
    if (!pickup || !dropoff) return alert("Please enter pickup and dropoff");
    if (isScheduled && !scheduledTime) return alert("Select a time for scheduled ride");

    setLoading(true);
    setTimeout(() => {
      alert(
        isScheduled
          ? `Scheduled ride requested for ${scheduledTime}!\nEstimate: $${estimate}`
          : `Instant ride requested!\nLooking for nearby drivers...\nEstimate: $${estimate}`
      );
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-2 gold-text">
        {isScheduled ? "Schedule a Ride" : "Book Instant Ride"}
      </h1>
      <p className="text-gray-400 mb-8">
        {isScheduled ? "Book in advance for reliability" : "Get a ride now in NW Ohio"}
      </p>

      <div className="space-y-6">
        <div className="flex gap-4">
          <button
            onClick={() => setIsScheduled(false)}
            className={`flex-1 py-3 rounded-lg font-semibold ${
              !isScheduled ? "bg-gold text-black" : "bg-gray-800"
            }`}
          >
            Instant
          </button>
          <button
            onClick={() => setIsScheduled(true)}
            className={`flex-1 py-3 rounded-lg font-semibold ${
              isScheduled ? "bg-gold text-black" : "bg-gray-800"
            }`}
          >
            Scheduled
          </button>
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gold w-5 h-5" />
          <input
            type="text"
            placeholder="Pickup location (e.g. Downtown Toledo)"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onBlur={calculateEstimate}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:border-gold outline-none"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-3 text-gold w-5 h-5" />
          <input
            type="text"
            placeholder="Dropoff location (e.g. Toledo Express Airport)"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            onBlur={calculateEstimate}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:border-gold outline-none"
          />
        </div>

        {isScheduled && (
          <div className="relative">
            <Clock className="absolute left-3 top-3 text-gold w-5 h-5" />
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:border-gold outline-none"
            />
          </div>
        )}

        {estimate && (
          <div className="holographic-border p-1">
            <div className="bg-black p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-400">Estimated fare</p>
                <p className="text-3xl font-bold gold-text">${estimate}</p>
              </div>
              <Car className="w-10 h-10 text-gold" />
            </div>
          </div>
        )}

        <button
          onClick={handleRequest}
          disabled={loading || !pickup || !dropoff}
          className="w-full bg-gold text-black font-bold py-4 rounded-lg text-lg disabled:opacity-50 hover:bg-yellow-500 transition flex items-center justify-center gap-2"
        >
          <CreditCard className="w-5 h-5" />
          {loading ? "Processing..." : isScheduled ? "Schedule Ride" : "Request Ride Now"}
        </button>
      </div>

      <p className="text-center text-gray-500 mt-8 text-sm">
        Transparent pricing • Live tracking • Tesla fleet available
      </p>
    </div>
  );
}
