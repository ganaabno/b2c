import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Tour } from "@/types";

export default function TourTable() {
  const [tours, setTours] = useState<Tour[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await axios.get("/api/tours");
        setTours(res.data);
        console.log(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error message:", err.message);
        }
      }
    };
    fetchTours();
  }, []);

  // useMemo sort hiij bgaa heseg
  const sortedTours = useMemo(() => {
    return [...tours].sort((a, b) => {
      // Handle missing dates by putting them at the end
      if (!a.departure_date) return 1;
      if (!b.departure_date) return -1;
      const dateA = new Date(a.departure_date);
      const dateB = new Date(b.departure_date);
      return dateA.getTime() - dateB.getTime();
    });
  }, [tours]);
  console.log("Sorted tours:", sortedTours);

  const INITIAL_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleRowClick = (slug: string) => navigate(`/tours/${slug}`);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);
  const handleCollapse = () => setVisibleCount(INITIAL_COUNT);

  const visibleTours = sortedTours.slice(0, visibleCount);
  const hasMore = visibleCount < sortedTours.length;
  const isExpanded = visibleCount > INITIAL_COUNT;

  const formatPrice = (price: number | string) => {
    if (!price) return "0";
    return Number(price).toLocaleString();
  };

  return (
    <div
      id="tour-table-container"
      className="w-full flex flex-col items-center px-[5%] py-12">
      <div className="text-center mb-8 font-serif py-5">
        <h1 className="text-3xl">Ойрын Хугцааны Аялалууд</h1>
        <p className="text-sm">Өөрт тохирох аялалыг хамгийн хямдаар.</p>
      </div>
      {/* --- MOBILE VIEW (Cards) --- */}
      <div className="w-full grid grid-cols-1 gap-3 md:hidden">
        {visibleTours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => handleRowClick(tour.slug || "")}
            className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm transition-all active:scale-[0.98] active:bg-slate-50 dark:active:bg-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-sm">
                <img
                  src={tour.cover_photo || ""}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                    Эхлэх
                  </span>
                  <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                    {tour.departure_date}
                  </span>
                </div>
                <div className="h-8 w-px bg-gray-200 dark:bg-gray-800"></div>
                <div className="flex flex-col gap-0.5 text-right">
                  <span className="text-[10px] font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                    Үнэ
                  </span>
                  <span className="text-sm font-bold bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                    {formatPrice(tour.single_supply_price || "")}₮
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW (Shadcn Table) --- */}
      <div className="hidden md:block w-full overflow-hidden rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 max-w-[1200px]">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-slate-50/80 dark:bg-gray-900/50">
            <TableRow className="hover:bg-transparent border-b border-slate-200 dark:border-gray-700">
              <TableHead className="w-[300px] py-4 font-bold text-slate-700 dark:text-gray-200 pl-6">
                Аяллын нэр
              </TableHead>
              <TableHead className="w-[150px] py-4 font-semibold text-slate-600 dark:text-gray-300">
                Эхлэх өдөр
              </TableHead>
              <TableHead className="w-[100px] py-4 font-semibold text-slate-600 dark:text-gray-300">
                Өдөр / Шөнө
              </TableHead>

              <TableHead className="w-[150px] py-4 font-semibold text-slate-600 dark:text-gray-300">
                Дуусах өдөр
              </TableHead>
              <TableHead className="w-[150px] text-right py-4 font-bold text-slate-700 dark:text-gray-200 pr-6">
                1 хүний үнэ
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTours.map((tour) => (
              <TableRow
                key={tour.id}
                onClick={() => handleRowClick(tour.slug || "")}
                className="
                  cursor-pointer border-b border-slate-100 dark:border-gray-700
                  transition-all duration-200 ease-in-out
                  hover:bg-indigo-50/40 dark:hover:bg-indigo-900/20
                  group
                ">
                <TableCell className="py-3 font-medium pl-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={tour.cover_photo || ""}
                        alt={tour.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-slate-700 dark:text-gray-200 text-[20px] font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tour.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3">
                  <span className="text-slate-600 dark:text-gray-300 font-medium text-xl">
                    {tour.departure_date}
                  </span>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center gap-3">
                    {/* The Visual Pill */}
                    <div className="relative flex h-10 overflow-hidden rounded-full border-2 border-gray-100 dark:border-gray-700 shadow-sm group-hover:shadow-md transition-all duration-300">
                      {/* Day Side (Sun) */}
                      <div className="flex items-center gap-1.5 bg-linear-to-b from-amber-300 to-orange-400 px-3 pl-4">
                        <span className="text-sm font-black text-white drop-shadow-sm">
                          {tour.duration_day}
                        </span>
                        <svg
                          className="h-4 w-4 text-white animate-spin-slow"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      </div>

                      {/* The Diagonal Slash Divider */}
                      <div className="absolute left-1/2 top-0 -ml-2 h-full w-4 -skew-x-12 bg-white dark:bg-gray-800 z-10"></div>

                      {/* Night Side (Moon) */}
                      <div className="flex items-center gap-1.5 bg-linear-to-b from-indigo-900 to-slate-900 px-3 pr-4">
                        <svg
                          className="h-3.5 w-3.5 text-indigo-200"
                          fill="currentColor"
                          viewBox="0 0 24 24">
                          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                        </svg>
                        <span className="text-sm font-black text-indigo-100 drop-shadow-sm">
                          {tour.duration_night}
                        </span>
                      </div>
                    </div>

                    {/* Minimal Text Label (Optional, for clarity) */}
                    {/* <div className="flex flex-col text-[10px] font-bold uppercase tracking-wider leading-tight text-gray-400">
      <span>Days</span>
      <span>Nights</span>
    </div> */}
                  </div>
                </TableCell>
                <TableCell className="py-3 text-slate-600 dark:text-gray-300 font-medium text-xl">
                  {tour.arrival_date}
                </TableCell>
                <TableCell className="text-right py-3 pr-6">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xl group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    ₮{formatPrice(tour.single_supply_price || "")}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="group relative overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0">
            <span className="relative z-10 flex items-center gap-2">
              Цааш үзэх
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>
        )}

        {isExpanded && (
          <button
            onClick={handleCollapse}
            className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0">
            <span className="flex items-center gap-2">
              Хураах
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
