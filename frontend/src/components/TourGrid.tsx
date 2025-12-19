import { MapPin, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Tour } from "@/types";

async function fetchFeaturedTours(): Promise<Tour[]> {
  const res = await axios.get("/api/tours");
  return res.data.slice(0, 6);
}

export default function TourGrid() {
  const { data: tours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["featured-tours"],
    queryFn: fetchFeaturedTours,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto my-20 py-12 text-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400">
          Онцлох аялалууд ачааллаж байна...
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-20 py-12">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Онцлох Аялалууд</h2>
        <Link
          to="/tours"
          className="relative text-3xl font-bold text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          Бүх Аялалыг Харах
          <span className="absolute left-1/2 -bottom-[15px] w-64 h-0.5 bg-gray-900 dark:bg-gray-100 -translate-x-1/2"></span>
          <span className="absolute left-[calc(50%+116px)] -bottom-5 w-3 h-3 border-r-2 border-b-2 border-gray-900 dark:border-gray-100 -rotate-45"></span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow duration-300 group"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
              <img
                src={
                  tour.image ||
                  "https://via.placeholder.com/800x600?text=No+Image"
                }
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {tour.single_supply_price && (
                <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-semibold text-gray-900 dark:text-gray-100 shadow dark:shadow-gray-900/50">
                  {tour.single_supply_price.includes("₮") ? tour.single_supply_price : `₮${tour.single_supply_price}`}
                </div>
              )}
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {tour.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{tour.country}</span>
                </div>
                {tour.duration_day && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{tour.duration_day}</span>
                  </div>
                )}
                {tour.group_size && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{tour.group_size} хүн</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/tours/${tour.slug}`}
                  className="w-full py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-center transition-colors"
                >
                  Дэлгэрэнгүй
                </Link>
                <button className="w-full py-2 rounded-md text-sm font-medium text-white bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 transition-colors">
                  Захиалах
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}