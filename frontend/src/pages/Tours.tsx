import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Utensils,
  AlertCircle,
  Loader2,
  Search,
} from "lucide-react";
import type { Tour } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Tours() {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Loading epic adventures...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4 max-w-md px-4">
          <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full w-fit mx-auto">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Unable to load tours
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            We couldn't fetch the latest tours. Please check your connection or
            try again later.
          </p>
          <Button onClick={() => window.location.reload()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const hasMeal = (meal?: string | null) => {
    if (!meal) return false;
    const m = meal.toLowerCase();
    return m.includes("included") || m.includes("yes") || m.includes("багтсан");
  };

  // Helper to format price nicely
  const formatPrice = (price: string | number) => {
    const num = String(price).replace(/[^0-9]/g, "");
    if (!num) return "Price TBD";
    return `₮${Number(num).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans transition-colors duration-300">
      {/* --- Header Section --- */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
            Explore the <span className="text-amber-600">World</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover unforgettable journeys, curated just for you. From mountain
            peaks to city streets, find your next adventure here.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search destinations..."
              className="pl-10 h-12 rounded-full bg-gray-100 dark:bg-gray-700 border-transparent focus:border-amber-500 focus:ring-amber-500 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* --- Tours Grid --- */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {filteredTours.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 dark:text-gray-400 font-medium">
              {searchTerm
                ? "No tours found matching your search."
                : "No tours available at the moment."}
            </p>
            {searchTerm && (
              <Button
                variant="link"
                onClick={() => setSearchTerm("")}
                className="mt-2 text-amber-600"
              >
                Clear search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTours.map((tour) => (
              <Link
                key={tour.id}
                to={`/tours/${tour.slug}`}
                className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={
                      tour.image || "https://placehold.co/800x600?text=No+Image"
                    }
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {tour.duration_day && (
                      <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xs text-gray-900 dark:text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <Clock className="h-3 w-3 text-amber-600" />
                        {tour.duration_day} Days
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white/90 text-sm font-medium flex items-center gap-1 mb-1">
                      <MapPin className="h-4 w-4 text-amber-400" />
                      {tour.country}
                    </p>
                    <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {tour.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 flex-1">
                    {tour.description}
                  </p>

                  {/* Info Row */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                    {tour.departure_date && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-amber-600" />
                        <span>
                          {new Date(tour.departure_date).toLocaleDateString(
                            "mn-MN"
                          )}
                        </span>
                      </div>
                    )}
                    {(hasMeal(tour.breakfast) ||
                      hasMeal(tour.lunch) ||
                      hasMeal(tour.dinner)) && (
                      <div
                        className="flex items-center gap-1.5"
                        title="Meals Included"
                      >
                        <Utensils className="h-4 w-4 text-green-600" />
                        <span>Meals</span>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
                        Price per person
                      </p>
                      <p className="text-2xl font-black text-amber-600 dark:text-amber-500">
                        {formatPrice(tour.single_supply_price || "")}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
