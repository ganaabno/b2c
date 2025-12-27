import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  AlertCircle,
  Loader2,
  Search,
  Sparkles,
  Filter,
  ChevronDown,
  ArrowUpDown,
} from "lucide-react";
import type { Tour } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import bg from "@/assets/tours-bg.jpg";

export default function Tours() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "date">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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

  // Filter tours
  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tours
  const sortedTours = [...filteredTours].sort((a, b) => {
    let comparison = 0;

    if (sortBy === "name") {
      comparison = a.title.localeCompare(b.title, "mn-MN");
    } else if (sortBy === "price") {
      const priceA =
        Number(String(a.single_supply_price).replace(/[^0-9]/g, "")) || 0;
      const priceB =
        Number(String(b.single_supply_price).replace(/[^0-9]/g, "")) || 0;
      comparison = priceA - priceB;
    } else if (sortBy === "date") {
      const dateA = a.departure_date ? new Date(a.departure_date).getTime() : 0;
      const dateB = b.departure_date ? new Date(b.departure_date).getTime() : 0;
      comparison = dateA - dateB;
    }

    return sortOrder === "asc" ? comparison : -comparison;
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case "name":
        return "Аяллын нэр";
      case "price":
        return "Үнэ";
      case "date":
        return "Огноо";
      default:
        return "Аяллын нэр";
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-300">
            Түр хүлээнэ үү...
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

  const formatPrice = (price: string | number) => {
    const num = String(price).replace(/[^0-9]/g, "");
    if (!num) return "Price TBD";
    return `₮${Number(num).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Hero Section with Background Image */}
      <div className="relative h-[500px] pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={bg}
            alt="Travel background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-white text-sm font-semibold border border-white/20">
            <Sparkles className="h-4 w-4" />
            <span>Таний дараагийн аялал эндээс эхэлнэ</span>
          </div>

          <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed text-center">
            Аялал бол амьдралын хамгийн сайхан хөрөнгө оруулалт.
          </p>

          {/* Search and Filter Bar */}
          <div className="w-full max-w-4xl mx-auto flex gap-3">
            <div className="relative group flex-1">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-600" />
              <Input
                type="text"
                placeholder="Аялал хайх......."
                className="pl-14 pr-6 h-14 rounded-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-0 shadow-2xl focus:ring-2 focus:ring-blue-500 text-base font-medium placeholder:text-gray-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="h-14 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-2xl flex items-center gap-2 font-semibold">
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Tours Grid Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Бүх аялалууд ({sortedTours.length})
          </h2>

          <div className="flex items-center gap-3">
            {/* Sort Order Toggle */}
            <Button
              onClick={toggleSortOrder}
              variant="outline"
              className="h-11 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <span className="font-semibold">
                {sortOrder === "asc" ? "Өсөхөөр" : "Буурахаар"}
              </span>
            </Button>

            {/* Sort By Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 px-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="font-semibold">{getSortLabel()}</span>
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-xl"
              >
                <DropdownMenuItem
                  onClick={() => setSortBy("name")}
                  className={`cursor-pointer ${
                    sortBy === "name" ? "bg-blue-50 dark:bg-blue-900/30" : ""
                  }`}
                >
                  <span className="font-medium">Аяллын нэр</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("price")}
                  className={`cursor-pointer ${
                    sortBy === "price" ? "bg-blue-50 dark:bg-blue-900/30" : ""
                  }`}
                >
                  <span className="font-medium">Үнэ</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSortBy("date")}
                  className={`cursor-pointer ${
                    sortBy === "date" ? "bg-blue-50 dark:bg-blue-900/30" : ""
                  }`}
                >
                  <span className="font-medium">Огноо</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {sortedTours.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                <Search className="h-10 w-10 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl text-gray-700 dark:text-gray-300 font-semibold">
                {searchTerm
                  ? "No tours found matching your search."
                  : "No tours available at the moment."}
              </p>
              {searchTerm && (
                <Button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3"
                >
                  Clear search
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sortedTours.map((tour) => (
              <Link
                key={tour.id}
                to={`/tours/${tour.slug}`}
                className="group flex flex-col bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={
                      tour.cover_photo ||
                      "https://placehold.co/800x600?text=No+Image"
                    }
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Duration Badge */}
                  <div className="absolute top-4 left-4">
                    {tour.duration_day && (
                      <span className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Clock className="h-3.5 w-3.5" />
                        {tour.duration_day} Days
                      </span>
                    )}
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                    <p className="text-blue-300 text-sm font-semibold flex items-center gap-1.5 uppercase tracking-wide">
                      <MapPin className="h-4 w-4" />
                      {tour.country}
                    </p>
                    <h3 className="text-2xl font-black text-white leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {tour.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 space-y-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 flex-1">
                    {tour.description}
                  </p>

                  {/* Date Info */}
                  {tour.departure_date && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 px-4 py-3 rounded-xl">
                      <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      <span className="font-medium">
                        {new Date(tour.departure_date).toLocaleDateString(
                          "mn-MN",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider mb-1">
                        From
                      </p>
                      <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                        {formatPrice(tour.single_supply_price || "")}
                      </p>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="h-6 w-6" />
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
