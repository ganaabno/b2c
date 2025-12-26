import { useEffect, useState, useRef, Suspense, lazy } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MapPin,
  Clock,
  Users,
  BedDouble,
  ArrowLeft,
  Share2,
  Heart,
  Thermometer,
  CheckCircle2,
  XCircle,
  Plane,
  Info,
  Phone,
  ShieldCheck,
  Camera,
  Star,
  ArrowRight,
  Flame,
  AlertCircle,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import type { Tour } from "@/types";
import { Button } from "@/components/ui/button";

const Hainan = lazy(() => import("../components/hutulbur/Hainan"));
const Turkey = lazy(() => import("../components/hutulbur/Turkey"));
const Bali = lazy(() => import("../components/hutulbur/Bali"));
const Dalyan = lazy(() => import("../components/hutulbur/Dalyan"));
const Halong_Bay = lazy(() => import("../components/hutulbur/Halong_Bay"));
const HoChiMinh_Phu_coac = lazy(
  () => import("../components/hutulbur/HoChiMinh_Phu_coac")
);
const Janjieje = lazy(() => import("../components/hutulbur/Janjieje"));
const Japan = lazy(() => import("../components/hutulbur/Japan"));
const Natrang = lazy(() => import("../components/hutulbur/Natrang"));
const Phu_Coac = lazy(() => import("../components/hutulbur/Phu_Coac"));
const Shanghai = lazy(() => import("../components/hutulbur/Shanghai"));
const Singapore = lazy(() => import("../components/hutulbur/Singapore"));
const Thailand_Banggok = lazy(
  () => import("../components/hutulbur/Thailand_Banggok")
);

const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-500">
      <Icon className="h-6 w-6" />
    </div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
      {title}
    </h2>
  </div>
);

export default function TourDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Refs for scrolling to sections
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const hotelRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const showHutulbur = (tour: Tour) => {
    console.log(tour.genre)
    switch (tour?.genre) {
      case "Hainan":
        return <Hainan />;
      case "Turkey":
        return <Turkey />;
      case "Bali":
        return <Bali />;
      case "Dalyan":
        return <Dalyan />;
      case "Halong_Bay":
        return <Halong_Bay />;
      case "HoChiMinh_Phu_coac":
        return <HoChiMinh_Phu_coac />;
      case "Janjieje":
        return <Janjieje />;
      case "Japan":
        return <Japan />;
      case "Natrang":
        return <Natrang />;
      case "Phu_Coac":
        return <Phu_Coac />;
      case "Shanghai":
        return <Shanghai />;
      case "Singapore":
        return <Singapore />;
      case "Thailand_Banggok":
        return <Thailand_Banggok />;
      default:
        return null;
    }
  };
  useEffect(() => {
    if (!slug) return;
    const fetchTour = async () => {
      try {
        const res = await axios.get(`/api/tours/${slug}`);
        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setTour(data);
      } catch (error) {
        console.error("Failed to fetch tour", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
    setSelectedImageIndex(0);
  }, [slug]);

  // Scroll spy logic could go here to update activeTab on scroll
  const scrollToSection = (ref: React.RefObject<any>, tab: string) => {
    setActiveTab(tab);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-10 w-10 animate-spin text-amber-600" />
      </div>
    );
  }

  if (!tour) return null;

  // Parse photos safely
  let galleryImages: string[] = [];
  try {
    if (Array.isArray(tour.photos)) galleryImages = tour.photos;
    else if (typeof tour.photos === "string")
      galleryImages = JSON.parse(tour.photos);
  } catch (e) {
    if (e) {
      console.log("error", e);
    }
    galleryImages = [];
  }

  const formatDate = (date?: string | null) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString("mn-MN", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-20">
      {/* --- 1. HERO HEADER (TravelX Style) --- */}
      <div className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <img
          src={tour.cover_photo || "https://placehold.co/1200x800"}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/20 to-transparent" />

        {/* Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 cursor-pointer backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 border border-white/10 transition"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-3">
            <button className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 border border-white/10 transition">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 border border-white/10 transition">
              <Heart className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Hero Text */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {tour.duration_day} Days Tour
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {tour.country}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight shadow-sm">
              {tour.title}
            </h1>
            {tour.subtitle && (
              <p className="text-lg text-gray-200 max-w-2xl font-light">
                {tour.subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* --- 2. STICKY NAV BAR (Global Travel Style) --- */}
      <div className="sticky top-20 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Overview", ref: overviewRef },
              { id: "itinerary", label: "Itinerary", ref: itineraryRef },
              { id: "hotel", label: "Accommodation", ref: hotelRef },
              { id: "gallery", label: "Photos", ref: galleryRef },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={`py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === item.id
                    ? "border-amber-600 text-amber-600 dark:text-amber-500"
                    : "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* --- LEFT COLUMN (Main Content) --- */}
          <div className="lg:col-span-2 space-y-12">
            {/* OVERVIEW SECTION */}
            <div ref={overviewRef} className="scroll-mt-24">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                  <Clock className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Duration</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {tour.duration_day} Days
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                  <Users className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">
                      Group Size
                    </p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {tour.group_size || 20} People
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                  <Thermometer className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Weather</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      {tour.country_temperature || "25"}°C
                    </p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                  <Plane className="h-6 w-6 text-amber-600" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Flight</p>
                    <p className="font-bold text-gray-900 dark:text-gray-100">
                      Included
                    </p>
                  </div>
                </div>
              </div>

              <SectionTitle icon={Info} title="Tour Overview" />
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                {tour.description}
              </div>
            </div>

            {/* ITINERARY SECTION (Visual Timeline) */}
            <div ref={itineraryRef} className="scroll-mt-24">
              <SectionTitle icon={MapPin} title="Itinerary Highlights" />

              {/* Since we don't have structured itinerary data yet, we create a visual placeholder or wrap the description */}
              <div className="relative border-l-2 border-dashed border-amber-200 dark:border-amber-900/50 ml-4 space-y-8 pb-4">
                {/* Mock Day 1 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-amber-500 ring-4 ring-white dark:ring-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Day 1: Departure & Arrival
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Flight from Ulaanbaatar to {tour.country}. Transfer to hotel
                    and check-in. Welcome dinner included.
                  </p>
                </div>

                {/* Mock Day 2 */}
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-amber-500 ring-4 ring-white dark:ring-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Day 2 - {Number(tour.duration_day) - 1}: Exploration
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Full days of activities. (Refer to the detailed description
                    above for specific daily activities).
                  </p>
                </div>

                {/* Mock Final Day */}
                <div className="relative pl-8">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-gray-400 ring-4 ring-white dark:ring-gray-900" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Day {tour.duration_day}: Return
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Breakfast at hotel. Transfer to airport for flight back to
                    Ulaanbaatar.
                  </p>
                </div>
              </div>
            </div>

            {/* INCLUSIONS SECTION (New!) */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                What's Included
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Included */}
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Round trip flight tickets
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Accommodation ({tour.hotel})
                    </span>
                  </li>

                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Airport Transfers
                    </span>
                  </li>
                </ul>

                {/* Not Included */}
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Personal expenses
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Travel Insurance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                    <span className="text-gray-500 dark:text-gray-400">
                      Optional Tours
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ACCOMMODATION SECTION */}
            <div ref={hotelRef} className="scroll-mt-24">
              <SectionTitle icon={BedDouble} title="Accommodation" />
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 dark:bg-gray-700 relative">
                  {/* Placeholder for hotel image since we don't have a specific hotel_image field */}
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    <Camera className="h-8 w-8" />
                  </div>
                </div>
                <div className="p-6 md:w-2/3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {tour.hotel || "Hotel TBD"}
                    </h3>
                    <div className="flex text-yellow-400">
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                      <Star className="h-4 w-4 fill-current" />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    Comfortable stay located near city center/beach. Includes
                    modern amenities and free Wi-Fi.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
                      Free Wifi
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
                      Pool
                    </span>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-300">
                      Gym
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* GALLERY SECTION */}
            <div ref={galleryRef} className="scroll-mt-24">
              <SectionTitle icon={Camera} title="Photo Gallery" />

              {galleryImages.length > 0 ? (
                <div className="space-y-4">
                  {/* 1. Main Large Image Viewer */}
                  <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800 group">
                    <img
                      src={galleryImages[selectedImageIndex]}
                      alt={`Gallery View ${selectedImageIndex + 1}`}
                      className="h-full w-full object-cover transition-all duration-500"
                    />

                    {/* Left Arrow */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === 0 ? galleryImages.length - 1 : prev - 1
                        );
                      }}
                      className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowLeft className="h-6 w-6" />
                    </button>

                    {/* Right Arrow */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex((prev) =>
                          prev === galleryImages.length - 1 ? 0 : prev + 1
                        );
                      }}
                      className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ArrowRight className="h-6 w-6" />{" "}
                      {/* Make sure to import ArrowRight */}
                    </button>
                  </div>

                  {/* 2. Thumbnail Strip */}
                  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImageIndex === idx
                            ? "border-amber-600 ring-2 ring-amber-600/30"
                            : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                  <Camera className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Gallery images coming soon</p>
                </div>
              )}
            </div>

            <Suspense
              fallback={<div>Components are loading please wait...</div>}
            >
              {showHutulbur(tour)}
            </Suspense>
          </div>

          {/* --- RIGHT COLUMN (Sticky Booking) --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 space-y-6">
              {/* Price Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-amber-600 p-4 text-white text-center">
                  <p className="text-sm opacity-90">Special Offer Price</p>
                  <h3 className="text-3xl font-bold">
                    ₮{Number(tour.single_supply_price).toLocaleString()}
                  </h3>
                </div>

                <div className="p-6 space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Departure
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatDate(tour.departure_date)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm border-b border-gray-100 dark:border-gray-700 pb-2">
                      <span className="text-gray-500 dark:text-gray-400">
                        Return
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {formatDate(tour.arrival_date)}
                      </span>
                    </div>
                    {/* Availability / Status Section */}
                    <div className="flex justify-between text-sm pb-2 items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Төлөв
                      </span>

                      {/* Logic to hide exact numbers */}
                      {tour.seats <= 0 ? (
                        <span className="font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" /> Дүүрсэн{" "}
                          {/* Sold Out */}
                        </span>
                      ) : tour.seats <= 5 ? (
                        <span className="font-bold text-orange-500 flex items-center gap-1 animate-pulse">
                          <Flame className="h-4 w-4" /> Цөөхөн суудал үлдлээ!
                        </span>
                      ) : (
                        <span className="font-bold text-green-600 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Захиалга авч
                          байна
                        </span>
                      )}
                    </div>
                  </div>

                  <Button className="w-full h-12 text-lg font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-200 dark:shadow-none">
                    Book This Tour
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <ShieldCheck className="h-4 w-4" /> No hidden fees • Secure
                    payment
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-200">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                      Have questions?
                    </p>
                    <p className="font-bold text-blue-900 dark:text-blue-100">
                      Talk to an expert
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                  +976 76060606
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-300/80">
                  Monday - Sunday, 9am - 8pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
