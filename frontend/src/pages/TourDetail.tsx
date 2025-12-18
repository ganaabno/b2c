
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  Calendar, MapPin, Clock, Users, Utensils, 
  BedDouble, Sun, Moon, ArrowLeft, CheckCircle2, 
  Share2, Heart, Thermometer
} from "lucide-react";
import { Loader2 } from "lucide-react";
import type { Tour } from "@/types"; // Ensure this path is correct

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`/api/tours/${id}`);
        // If your API returns { tour: ... } or just the object, adjust here
        const arrai = res.data;
        setTour(arrai[0]); 
       
      } catch (error) {
        console.error("Failed to fetch tour", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Tour not found</h2>
        <button onClick={() => navigate(-1)} className="text-amber-600 hover:underline">
          Go Back
        </button>
      </div>
    );
  }

  // Helper for date formatting
  const formatDate = (dateString?: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("mn-MN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // const getStatusBadge = (status: string) => {
  //   const styles = {
  //     ACTIVE: "bg-green-500 text-white",
  //     FULL: "bg-red-500 text-white",
  //     INACTIVE: "bg-gray-500 text-white",
  //     COMPLETED: "bg-blue-500 text-white",
  //   };
 
  //   return styles[status] || "bg-gray-500 text-white";
  // };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* --- HERO SECTION --- */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
        <img
          src={tour.image || "https://placehold.co/1200x800"}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Top Nav */}
        <div className="absolute left-0 top-0 flex w-full justify-between p-6">
          <button 
            onClick={() => navigate(-1)}
            className="rounded-full bg-white/20 p-3 text-white backdrop-blur-md transition hover:bg-white/40"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-3">
            <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-md transition hover:bg-white/40">
              <Share2 className="h-6 w-6" />
            </button>
            <button className="rounded-full bg-white/20 p-3 text-white backdrop-blur-md transition hover:bg-white/40">
              <Heart className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="mx-auto max-w-7xl">
            <span className={`mb-4 inline-block rounded-full px-4 py-1 text-sm font-bold tracking-wide `}>
              {tour.status}
            </span>
            <h1 className="mb-2 text-4xl font-bold text-white shadow-sm md:text-6xl">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span className="text-lg">{tour.country}</span>
              </div>
              {tour.country_temperature && (
                <div className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-amber-400" />
                  <span className="text-lg">{tour.country_temperature}°C</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="mx-auto -mt-8 max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* LEFT COLUMN (Details) */}
          <div className="lg:col-span-2 mt-10">
            
            {/* Quick Stats Card */}
            <div className="mb-8 grid grid-cols-2 gap-4 rounded-2xl bg-white p-6 shadow-sm md:grid-cols-4">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100 last:border-0">
                <Clock className="h-6 w-6 text-amber-600" />
                <span className="text-sm text-gray-500">Duration</span>
                <span className="font-bold text-gray-900">{tour.duration_day}D / {tour.duration_night}N</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100 last:border-0">
                <Calendar className="h-6 w-6 text-amber-600" />
                <span className="text-sm text-gray-500">Departure</span>
                <span className="font-bold text-gray-900">{formatDate(tour.departure_date || "")}</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 border-r border-gray-100 last:border-0">
                <Calendar className="h-6 w-6 text-amber-600" />
                <span className="text-sm text-gray-500">Return</span>
                <span className="font-bold text-gray-900">{formatDate(tour.arrival_date ||"")}</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1">
                <Users className="h-6 w-6 text-amber-600" />
                <span className="text-sm text-gray-500">Seats</span>
                <span className="font-bold text-gray-900">{tour.seats} Available</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">
              <h3 className="mb-4 text-2xl font-bold text-gray-900">About this Tour</h3>
              <p className="leading-relaxed text-gray-600 whitespace-pre-line">
                {tour.description || "No description provided for this tour."}
              </p>
            </div>

            {/* Accommodation & Meals */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-2">
                    <BedDouble className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Accommodation</h3>
                </div>
                <p className="text-gray-600">{tour.hotel || "Hotel details pending"}</p>
                {tour.additional_bed && (
                   <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                     <span className="font-semibold">Extra Bed Option:</span> {tour.additional_bed}
                   </div>
                )}
              </div>

              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-full bg-orange-100 p-2">
                    <Utensils className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Meals Included</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50">
                      <Sun className="h-4 w-4 text-orange-500" />
                    </div>
                    <span><span className="font-semibold">Breakfast:</span> {tour.breakfast || "Not included"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50">
                      <Sun className="h-4 w-4 text-orange-500" />
                    </div>
                    <span><span className="font-semibold">Lunch:</span> {tour.lunch || "Not included"}</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50">
                      <Moon className="h-4 w-4 text-indigo-500" />
                    </div>
                    <span><span className="font-semibold">Dinner:</span> {tour.dinner || "Not included"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (Sticky Booking Card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-gray-100">
              <div className="mb-6">
                <p className="text-sm text-gray-500">Starting from</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-amber-600">₮{Number(tour.single_supply_price).toLocaleString()}</span>
                  <span className="text-gray-400">/ person</span>
                </div>
              </div>

              <div className="mb-6 space-y-4 rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Departure</span>
                  <span className="font-medium text-gray-900">{formatDate(tour.departure_date || "")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Return</span>
                  <span className="font-medium text-gray-900">{formatDate(tour.arrival_date || "")}</span>
                </div>
                <div className="h-px bg-gray-200" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className={`font-bold ${tour.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}`}>
                    {tour.status}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-600 py-4 font-bold text-white shadow-lg shadow-amber-200 transition hover:bg-amber-700 hover:shadow-xl">
                  Book Now
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-100 bg-white py-4 font-bold text-gray-700 transition hover:border-gray-200 hover:bg-gray-50">
                  Download Itinerary
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="h-4 w-4" />
                <span>Best Price Guaranteed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
