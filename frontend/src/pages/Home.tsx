import Comments from "@/components/ui/comments";
import TourGrid from "../components/TourGrid";
import TourTable from "../components/TourTable";
import SearchBox from "@/components/SearchBox";
import { useEffect, useState, useMemo } from "react";
import type { Tour } from "@/types";
import axios from "axios";

export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [, setLoading] = useState(true);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/tours");
        setTours(res.data);
      } catch (err) {
        console.error("Failed to load tours", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const availableCountries = useMemo(() => {
    const countries = tours
      .map((tour) => tour.country?.trim())
      .filter((country): country is string => Boolean(country));
    return [...new Set(countries)].sort();
  }, [tours]);

  const availableDates = useMemo(() => {
    let relevantTours = tours;

    if (selectedCountry) {
      relevantTours = tours.filter(
        (tour) => tour.country?.trim() === selectedCountry.trim()
      );
    }

    const dates = relevantTours
      .map((tour) => tour.departure_date?.trim())
      .filter((date): date is string => Boolean(date));

    return [...new Set(dates)].sort();
  }, [tours, selectedCountry]);

  const handleSearch = () => {
    document
      .getElementById("tour-table-container")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="w-screen h-[70vh] relative -mt-20 md:-mt-32">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex flex-col justify-end left-20 pb-32 px-12 md:px-16">
          <div className="max-w-4xl">
            <h1 className="font-bold text-5xl md:text-6xl bg-linear-to-b from-white to-white/60 bg-clip-text text-transparent [webkit-text-stroke:1px_rgba(255,255,255,0.35)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
              GTC MONGOLIA
            </h1>
            <p className="font-bold text-2xl md:text-4xl mt-4 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent [webkit-text-stroke:1px_rgba(255,255,255,0.35)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
              Дэлхийгээр Аялж. <br />
              Дэлхийн Дайтай Сэтгэе!
            </p>
            <p className="font-bold text-lg md:text-xl mt-6 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent [webkit-text-stroke:1px_rgba(255,255,255,0.35)] drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
              GTC MONGOLIA: Мөрөөдлийн аяллаа бидэнтэй эхлүүл.
              <br />
              Тансаг аялалыг хамгийн хямдаар санал болгож байна.
            </p>
          </div>
        </div>

        <SearchBox
          selectedCountry={selectedCountry}
          selectedDate={selectedDate}
          availableCountries={availableCountries}
          availableDates={availableDates}
          onCountryChange={setSelectedCountry}
          onDateChange={setSelectedDate}
          onSearch={handleSearch}
        />
      </div>

      <div className="w-full mt-20 md:mt-24"></div>

      <TourTable
        tours={tours}
        filterCountry={selectedCountry}
        filterDeparture={selectedDate}
      />

      <TourGrid />
      <Comments />
    </>
  );
}
