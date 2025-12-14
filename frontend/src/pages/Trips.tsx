// src/pages/Trips.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Trip {
  id: string;
  title: string;
  description: string;
  image: string; // ← aliased from cover_photo
  country: string;
  departure_date: string;
  hotel: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  price: string; // ← single_supply_price is text in DB
  additional_bed?: string | null;
  country_temperature?: string | null;
  created_at: string;
}

export default function Trips() {
  const {
    data: trips = [],
    isLoading,
    error,
  } = useQuery<Trip[]>({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await axios.get("/api/trips");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-3xl font-bold text-amber-600">
          Loading epic trips...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl text-red-600">Failed to load trips</p>
      </div>
    );
  }

  const mealIncluded = (meal: string) =>
    meal?.toLowerCase() === "included" || meal === "yes";

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-12 text-center text-6xl font-black text-amber-600">
          All Trips 🌍✈️
        </h1>

        {trips.length === 0 ? (
          <p className="text-center text-2xl text-gray-600">
            No trips available yet — manager gotta add some! xD
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="overflow-hidden rounded-2xl bg-white shadow-2xl transition hover:scale-105 hover:shadow-3xl"
              >
                {/* Cover Photo */}
                {trip.image ? (
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="h-72 bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      No Photo
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-800">
                    {trip.title}
                  </h3>

                  <p className="mt-2 text-lg text-gray-600">{trip.country}</p>

                  <p className="mt-4 text-gray-700">{trip.description}</p>

                  {/* Meals included icons */}
                  <div className="mt-6 flex gap-4 text-sm">
                    {mealIncluded(trip.breakfast) && (
                      <span className="font-bold text-green-600">
                        🍳 Breakfast
                      </span>
                    )}
                    {mealIncluded(trip.lunch) && (
                      <span className="font-bold text-green-600">🍱 Lunch</span>
                    )}
                    {mealIncluded(trip.dinner) && (
                      <span className="font-bold text-green-600">
                        🍽️ Dinner
                      </span>
                    )}
                  </div>

                  {/* Price & Book */}
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      <span className="text-4xl font-black text-amber-600">
                        ${trip.price}
                      </span>
                      {trip.departure_date && (
                        <p className="mt-1 text-gray-600">
                          Departs:{" "}
                          {new Date(trip.departure_date).toLocaleDateString()}
                        </p>
                      )}
                    </div>

                    <button className="rounded-lg bg-amber-600 px-8 py-4 font-bold text-white hover:bg-amber-700 transition">
                      Book Now 🚀
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
