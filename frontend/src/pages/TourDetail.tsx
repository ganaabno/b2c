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
const HoChiMinh_Phu_Quoc = lazy(
  () => import("../components/hutulbur/HoChiMinh_Phu_Quoc")
);
const Janjieje = lazy(() => import("../components/hutulbur/Janjieje"));
const Japan = lazy(() => import("../components/hutulbur/Japan"));
const Nha_Trang = lazy(() => import("../components/hutulbur/Nha_Trang"));
const Phu_Quoc = lazy(() => import("../components/hutulbur/Phu_Quoc"));
const Shanghai = lazy(() => import("../components/hutulbur/Shanghai"));
const Singapore = lazy(() => import("../components/hutulbur/Singapore"));
const Thailand_Banggok = lazy(
  () => import("../components/hutulbur/Thailand_Banggok")
);
const Phuket = lazy(() => import("../components/hutulbur/Phuket"));

import { hainanGallery, hainanHotel } from "../components/hutulbur/Hainan";
import { phuketGallery, phuketHotel } from "../components/hutulbur/Phuket";
import { dalyanGallery, dalyanHotel } from "../components/hutulbur/Dalyan";
import { turkeyGallery, turkeyHotel } from "../components/hutulbur/Turkey";
import {
  singaporeHotel,
  singaporeImages,
} from "../components/hutulbur/Singapore";
import {
  nhatrangHotel,
  nhatrangImages,
} from "../components/hutulbur/Nha_Trang";
import { phuquocHotel, phuquocImages } from "../components/hutulbur/Phu_Quoc";

const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-3 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
    <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-500">
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
    switch (tour?.genre) {
      case "Hainan":
        return {
          component: <Hainan />,
          gallery: hainanGallery,
          hotel: hainanHotel,
        };
      case "Phuket":
        return {
          component: <Phuket />,
          gallery: phuketGallery,
          hotel: phuketHotel,
        };
      case "Dalyan":
        return {
          component: <Dalyan />,
          gallery: dalyanGallery,
          hotel: dalyanHotel,
        };
      case "Turkey":
        return {
          component: <Turkey />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "Bali":
        return {
          component: <Bali />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "Halong_Bay":
        return {
          component: <Halong_Bay />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "HoChiMinh_Phu_Quoc":
        return {
          component: <HoChiMinh_Phu_Quoc />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "Janjieje":
        return {
          component: <Janjieje />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "Japan":
        return {
          component: <Japan />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "Nha_Trang":
        return {
          component: <Nha_Trang />,
          gallery: nhatrangImages,
          hotel: nhatrangHotel,
        };
      case "Phu_Quoc":
        return {
          component: <Phu_Quoc />,
          gallery: phuquocImages,
          hotel: phuquocHotel,
        };
      case "Shanghai":
        return {
          component: <Shanghai />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      case "Singapore":
        return {
          component: <Singapore />,
          gallery: singaporeImages,
          hotel: singaporeHotel,
        };
      case "Thailand_Banggok":
        return {
          component: <Thailand_Banggok />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
      default:
        return {
          component: <Bali />,
          gallery: turkeyGallery,
          hotel: turkeyHotel,
        };
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
        <Loader2 className="h-10 w-10 animate-spin text-sky-600" />
      </div>
    );
  }

  if (!tour) return null;

  const {
    component: HutulburComponent,
    gallery: customGallery,
    hotel: customHotel,
  } = showHutulbur(tour);

  let fallbackGallery: string[] = [];
  try {
    if (Array.isArray(tour.photos)) fallbackGallery = tour.photos;
    else if (typeof tour.photos === "string")
      fallbackGallery = JSON.parse(tour.photos);
  } catch (e) {
    console.log("Photo parse error", e);
  }
  const galleryImages =
    customGallery.length > 0 ? customGallery : fallbackGallery;

  const formatDate = (date?: string | null) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString("mn-MN", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans pb-20">
      {/* --- 1. HERO HEADER --- */}
      <div className="relative h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <img
          src={tour.cover_photo || "https://placehold.co/1200x800"}
          alt={tour.title}
          className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/20 to-transparent" />

        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
          <button
            onClick={() => navigate(-1)}
            className="bg-white/10 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/20 border border-white/10 transition"
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

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                {tour.duration_day} өдрийн аялал
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

      <div className="sticky top-16 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {[
              { id: "overview", label: "Дэлгэрэнгүй", ref: overviewRef },
              { id: "itinerary", label: "Хөтөлбөр", ref: itineraryRef },
              { id: "hotel", label: "Зочид буудал", ref: hotelRef },
              { id: "gallery", label: "Зураг", ref: galleryRef },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.ref, item.id)}
                className={`py-4 text-sm font-bold uppercase tracking-wide border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === item.id
                    ? "border-sky-600 text-sky-600 dark:text-sky-500"
                    : "border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN THREE-COLUMN LAYOUT */}
      <div className="max-w-[1800px] mx-auto px-4 py-8 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN - VERTICAL GALLERY */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            {/* LEFT COLUMN - VERTICAL GALLERY (WIDER IMAGES) */}
            <div className="lg:col-span-4 order-2 lg:order-1">
              {" "}
              {/* Increased from col-span-3 to 4 */}
              <div
                ref={galleryRef}
                className="scroll-mt-24 sticky top-32 space-y-4"
              >
                <SectionTitle icon={Camera} title="Зурагын цомог" />

                {galleryImages.length > 0 ? (
                  <div className="space-y-4">
                    {galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className="relative aspect-video overflow-hidden rounded-2xl cursor-pointer border-4 border-transparent transition-all  shadow-lg hover:shadow-xl"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {selectedImageIndex === idx && (
                          <div className="absolute inset-0  pointer-events-none" />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-32 bg-gray-100 dark:bg-gray-800 rounded-2xl">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                    <p className="text-gray-500 text-lg">
                      Зураг удахгүй нэмэгдэнэ
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN - MAIN CONTENT */}
          <div className="lg:col-span-6 order-3 space-y-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                <Clock className="h-6 w-6 text-sky-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Аялалын үргэлжлэх хугацаа
                  </p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {tour.duration_day} өдөр
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                <Users className="h-6 w-6 text-sky-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Групп</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {tour.group_size || 20} хүн
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                <Thermometer className="h-6 w-6 text-sky-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">Цаг агаар</p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    {tour.country_temperature || "25"}°C
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center text-center gap-2">
                <Plane className="h-6 w-6 text-sky-600" />
                <div>
                  <p className="text-xs text-gray-500 uppercase">
                    Нислэгийн тийз
                  </p>
                  <p className="font-bold text-gray-900 dark:text-gray-100">
                    Үнэгүй
                  </p>
                </div>
              </div>
            </div>

            <div ref={overviewRef} className="scroll-mt-24">
              <SectionTitle icon={Info} title="Аялалын тухай" />
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                {tour.description}
              </div>
            </div>

            <div ref={itineraryRef} className="scroll-mt-24">
              <SectionTitle icon={Clock} title="Аяллын хөтөлбөр" />
              <Suspense
                fallback={
                  <div className="py-12 text-center">
                    Хөтөлбөр ачааллаж байна...
                  </div>
                }
              >
                {HutulburComponent}
              </Suspense>
            </div>

            <div ref={hotelRef} className="scroll-mt-24">
              <SectionTitle icon={BedDouble} title="Зочид буудал" />
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                  {customHotel.length > 0 ? (
                    <>
                      <img
                        src={customHotel[0]}
                        alt={tour.hotel || "Hotel"}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      {customHotel.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                          {customHotel.map((_, i) => (
                            <div
                              key={i}
                              className="w-2 h-2 rounded-full bg-white/80"
                            />
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400">
                      <Camera className="h-12 w-12" />
                    </div>
                  )}
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

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Хөтөлбөрт орсон зүйлс:
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      2 талын нислэг
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Зочид буудал ({tour.hotel})
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Airport Transfers
                    </span>
                  </li>
                </ul>
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
          </div>

          {/* RIGHT COLUMN - STICKY BOOKING CARD */}
          <div className="lg:col-span-3 order-1 lg:order-3">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="bg-sky-600 p-4 text-white text-center">
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
                    <div className="flex justify-between text-sm pb-2 items-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        Төлөв
                      </span>
                      {tour.seats <= 0 ? (
                        <span className="font-bold text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" /> Дүүрсэн
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

                  <Button className="w-full h-12 text-lg font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-lg shadow-sky-200 dark:shadow-none">
                    Захиалах
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                    <ShieldCheck className="h-4 w-4" /> No hidden fees • Secure
                    payment
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-200">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 dark:text-blue-300 font-medium">
                      Танд асуулт байна уу?
                    </p>
                    <p className="font-bold text-blue-900 dark:text-blue-100">
                      Аялалын борлуулагчтай холбогдоорой
                    </p>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-2">
                  +976 76060606
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-300/80">
                  Даваа-Баасан: 09:00-19:00
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-300/80">
                  Бямба: 10:00-18:00
                </p>
                <p className="text-sm text-blue-600/80 dark:text-blue-300/80">
                  Ням: 13:00-18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
