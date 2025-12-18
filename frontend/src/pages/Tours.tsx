// src/pages/Tours.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type {Tour } from "@/types";
// This interface MUST match exactly what your backend SELECT returns


export default function Tours() {
  const {
    data: tours = [],
    isLoading,
    error,
  } = useQuery<Tour[]>({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await axios.get("/api/tours");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-3xl font-bold text-amber-600">
          Loading epic tours...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-2xl text-red-600">Failed to load tours 😭</p>
      </div>
    );
  }

  const mealIncluded = (meal: string | null) =>
    meal?.toLowerCase().includes("included") ||
    meal?.toLowerCase().includes("yes") ||
    meal?.toLowerCase().includes("багтсан");

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-12 text-center text-6xl font-black text-amber-600">
          Бүх Аялалууд 🌍✈️
        </h1>

        {tours.length === 0 ? (
          <p className="text-center text-2xl text-gray-600">
            Одоогоор аялал байхгүй байна — Менежер нэмэх ёстой шүү! xD
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="overflow-hidden rounded-2xl bg-white shadow-2xl transition hover:scale-105 hover:shadow-3xl"
              >
                {/* Cover Photo */}
                {tour.image ? (
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-72 w-full object-cover"
                  />
                ) : (
                  <div className="h-72 bg-linear-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {tour.title.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="text-3xl font-bold text-gray-800">
                    {tour.title}
                  </h3>

                  <p className="mt-2 text-lg text-gray-600">{tour.country}</p>

                  <p className="mt-4 text-gray-700 line-clamp-3">
                    {tour.description}
                  </p>

                  {/* Meals included */}
                  <div className="mt-6 flex flex-wrap gap-4 text-sm">
                    {mealIncluded(tour.breakfast) && (
                      <span className="font-bold text-green-600">
                        🍳 Өглөөний цай
                      </span>
                    )}
                    {mealIncluded(tour.lunch) && (
                      <span className="font-bold text-green-600">
                        🍱 Өдрийн хоол
                      </span>
                    )}
                    {mealIncluded(tour.dinner) && (
                      <span className="font-bold text-green-600">
                        🍽️ Оройн хоол
                      </span>
                    )}
                  </div>

                  {/* Price & Departure */}
                  <div className="mt-8 flex items-end justify-between">
                    <div>
                      {tour.single_supply_price ? (
                        <span className="text-4xl font-black text-amber-600">
                          {tour.single_supply_price.includes("₮")
                            ? tour.single_supply_price
                            : `₮${tour.single_supply_price}`}
                        </span>
                      ) : (
                        <span className="text-2xl text-gray-500">
                          Үнэ зарлагдаагүй
                        </span>
                      )}
                      {tour.departure_date && (
                        <p className="mt-1 text-gray-600">
                          Явах огноо:{" "}
                          {new Date(tour.departure_date).toLocaleDateString(
                            "mn-MN"
                          )}
                        </p>
                      )}
                    </div>

                    <button className="rounded-lg bg-amber-600 px-8 py-4 font-bold text-white hover:bg-amber-700 transition">
                      Захиалах 🚀
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
