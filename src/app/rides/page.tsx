import Link from "next/link";

export default function RidesPage() {
  const mockRides = [
    {
      id: "1",
      pickup: "Downtown Toledo",
      dropoff: "Toledo Express Airport",
      status: "completed",
      time: "Yesterday",
      price: 28.5,
    },
    {
      id: "2",
      pickup: "Perrysburg",
      dropoff: "Fifth Third Field",
      status: "scheduled",
      time: "Tomorrow 6:30 PM",
      price: 18.0,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 gold-text">Your Rides</h1>
      <div className="space-y-4">
        {mockRides.map((ride) => (
          <div key={ride.id} className="holographic-border p-1">
            <div className="bg-black p-4 rounded-lg">
              <div className="flex justify-between">
                <div>
                  <p className="font-semibold">{ride.pickup} → {ride.dropoff}</p>
                  <p className="text-sm text-gray-400">{ride.time}</p>
                </div>
                <div className="text-right">
                  <p className="gold-text font-bold">${ride.price}</p>
                  <span className="text-xs px-2 py-1 rounded bg-gray-800 capitalize">
                    {ride.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link
        href="/ride"
        className="block mt-8 text-center bg-gold text-black font-bold py-3 rounded-lg"
      >
        Book Another Ride
      </Link>
    </div>
  );
}
