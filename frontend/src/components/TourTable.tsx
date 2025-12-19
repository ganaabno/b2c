import { useState, useEffect } from "react";
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
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Error message:", err.message);
        }
        console.error("Failed to load tours");
      }
    };
    fetchTours();
  }, []);

  const INITIAL_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const handleRowClick = (slug: string) => navigate(`/tours/${slug}`);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);
  const handleCollapse = () => setVisibleCount(INITIAL_COUNT);

  const visibleTours = tours.slice(0, visibleCount);
  const hasMore = visibleCount < tours.length;
  const isExpanded = visibleCount > INITIAL_COUNT;

  const formatPrice = (price: number | string) => {
    if (!price) return "0";
    return Number(price).toLocaleString();
  };

  return (
    <div
      id="tour-table-container"
      className="w-full flex flex-col items-center px-[5%] py-8">
      
      {/* --- MOBILE VIEW (Cards) --- */}
      <div className="w-full grid grid-cols-1 gap-4 md:hidden">
        {visibleTours.map((tour) => (
          <div
            key={tour.id}
            onClick={() => handleRowClick(tour.id||"")}
            className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 shadow-sm transition-all active:scale-[0.98] active:bg-slate-50 dark:active:bg-gray-700 hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-500">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl shadow-sm">
                <img
                  src={tour.image || ""}
                  alt={tour.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-gray-100 text-sm leading-tight">
                  {tour.title}
                </h3>
                <span className="mt-1 inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/50 px-2 py-1 text-[10px] font-semibold text-indigo-700 dark:text-indigo-300">
                  {tour.duration_day} өдөр
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-xs border-t border-slate-100 dark:border-gray-700 pt-3">
              <div>
                <p className="text-slate-500 dark:text-gray-400 mb-0.5">Эхлэх</p>
                <p className="font-semibold text-slate-700 dark:text-gray-200">
                  {tour.departure_date}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 dark:text-gray-400 mb-0.5">Үнэ</p>
                <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatPrice(tour.single_supply_price || "")}₮
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW (Shadcn Table) --- */}
      <div className="hidden md:block w-full overflow-hidden rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
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
                Өдөр
              </TableHead>
              <TableHead className="w-[100px] py-4 font-semibold text-slate-600 dark:text-gray-300">
                Шөнө
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
                onClick={() => handleRowClick(tour.slug||"")}
                className="
                  cursor-pointer border-b border-slate-100 dark:border-gray-700
                  transition-all duration-200 ease-in-out
                  hover:bg-indigo-50/40 dark:hover:bg-indigo-900/20
                  group
                ">
                <TableCell className="py-3.5 font-medium pl-6">
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={tour.image || ""}
                        alt={tour.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-slate-700 dark:text-gray-200 font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {tour.title}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5">
                  <span className="text-slate-600 dark:text-gray-300 font-medium">{tour.departure_date}</span>
                </TableCell>
                <TableCell className="py-3.5">
                  <span className="inline-flex items-center justify-center rounded-md bg-indigo-50 dark:bg-indigo-900/50 px-2.5 py-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/70 transition-colors">
                    {tour.duration_day}
                  </span>
                </TableCell>
                <TableCell className="py-3.5">
                  <span className="inline-flex items-center justify-center rounded-md bg-slate-100 dark:bg-gray-700 px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-gray-300 group-hover:bg-slate-200 dark:group-hover:bg-gray-600 transition-colors">
                    {tour.duration_night}
                  </span>
                </TableCell>
                <TableCell className="py-3.5 text-slate-500 dark:text-gray-400">
                  {tour.arrival_date}
                </TableCell>
                <TableCell className="text-right py-3.5 pr-6">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[15px] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    ₮{formatPrice(tour.single_supply_price || "")}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- BUTTONS AREA --- */}
      <div className="mt-8 flex justify-center gap-4">
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="group flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800 px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-gray-300 shadow-sm transition-all hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-md active:scale-95">
            <span>Цааш үзэх</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        )}

        {isExpanded && (
          <button
            onClick={handleCollapse}
            className="group flex items-center gap-2 rounded-full border border-slate-200 dark:border-gray-600 bg-slate-50 dark:bg-gray-700 px-6 py-2.5 text-sm font-semibold text-slate-500 dark:text-gray-300 shadow-sm transition-all hover:bg-slate-100 dark:hover:bg-gray-600 hover:text-slate-800 dark:hover:text-gray-100 hover:shadow-md active:scale-95">
            <span>Хураах</span>
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}