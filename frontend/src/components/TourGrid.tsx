import { MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion"; // Import framer-motion
import type { Tour } from "@/types";
import BookTourButton from "./BookTourButton";

// --- SKELETON COMPONENT (For loading state) ---
const TourSkeleton = () => (
  <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
    <div className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      <div className="flex gap-2 pt-4">
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
      </div>
    </div>
  </div>
);

async function fetchFeaturedTours(): Promise<Tour[]> {
  const res = await axios.get("/api/tours");
  return res.data.slice(0, 6);
}

export default function TourGrid() {
  const { data: tours = [], isLoading } = useQuery<Tour[]>({
    queryKey: ["featured-tours"],
    queryFn: fetchFeaturedTours,
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="container mx-auto my-24 px-4">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div>
          <div className="flex items-center gap-2 text-green-600 dark:text-green-500 font-bold uppercase tracking-wider text-sm mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Бидний</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Онцлох{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-600 to-emerald-400">
              Аялалууд
            </span>
          </h2>
        </div>

        <Link
          to="/tours"
          className="group flex items-center gap-2 text-lg font-semibold text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          Бүх аялалуудыг харах
          <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full group-hover:bg-green-100 dark:group-hover:bg-green-900/30 transition-colors">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>

      {/* --- GRID CONTENT --- */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <TourSkeleton key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tours.map((tour) => (
            <motion.div
              key={tour.id}
              variants={item}
              className="group relative bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-green-900/5 dark:hover:shadow-green-900/20 transition-all duration-500"
            >
              {/* Image Section */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={
                    tour.cover_photo ||
                    "https://via.placeholder.com/800x600?text=No+Image"
                  }
                  alt={tour.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Glassmorphism Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Price Badge (Glass Effect) */}
                {tour.single_supply_price && (
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/20">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {tour.single_supply_price.includes("₮")
                        ? tour.single_supply_price
                        : `₮${Number(
                            tour.single_supply_price
                          ).toLocaleString()}`}
                    </span>
                  </div>
                )}

                {/* Country Badge */}
                <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/10">
                  <MapPin className="w-3 h-3" />
                  {tour.country}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 relative">
                {/* Floating Action Button (Optional visual flair) */}
                <Link
                  to={`/tours/${tour.slug}`}
                  className="absolute cursor-pointer -top-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg shadow-green-500/30 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {tour.title}
                </h3>

                {/* Meta Data Row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  {tour.duration_day && (
                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span>{tour.duration_day} Days</span>
                    </div>
                  )}
                  {tour.group_size && (
                    <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>{tour.group_size} People</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to={`/tours/${tour.slug}`}
                    className="py-2.5 rounded-xl text-sm font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-center transition-colors"
                  >
                    Дэлгэрэнгүй
                  </Link>

                  <BookTourButton tour={tour} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
