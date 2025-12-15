// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

interface Tour {
  id: string;
  title: string;
  description: string | null;
  price: number;
  duration_days: number | null;
  image_url: string | null;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [trips, settrips] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchtrips = async () => {
      try {
        const res = await axios.get("/api/trips");
        settrips(res.data);
      } catch (err) {
        console.error("Failed to load trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchtrips();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold text-amber-600">
              Welcome back, {user?.name || "Traveler"}! 🚀
            </h1>
            <p className="mt-2 text-xl text-gray-600">
              Role:{" "}
              <span className="font-bold text-amber-500">{user?.role}</span>
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-8 py-4 font-bold text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        <h2 className="mb-8 text-3xl font-bold text-gray-800">
          Available trips 🌍
        </h2>

        {loading ? (
          <p className="text-xl text-gray-600">Loading epic adventures...</p>
        ) : trips.length === 0 ? (
          <p className="text-xl text-gray-600">
            No trips yet
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((tour) => (
              <div
                key={tour.id}
                className="overflow-hidden rounded-2xl bg-white shadow-xl transition hover:shadow-2xl"
              >
                {tour.image_url ? (
                  <img
                    src={tour.image_url}
                    alt={tour.title}
                    className="h-64 w-full object-cover"
                  />
                ) : (
                  <div className="h-64 bg-linear-to-br from-amber-400 to-amber-600" />
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {tour.title}
                  </h3>
                  <p className="mt-3 text-gray-600">
                    {tour.description || "Amazing adventure awaits!"}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-bold text-amber-600">
                      ${tour.price}
                    </span>
                    {tour.duration_days && (
                      <span className="text-lg text-gray-600">
                        {tour.duration_days} days
                      </span>
                    )}
                  </div>
                  <button className="mt-6 w-full rounded-lg bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 transition">
                    Book Now ✈️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
