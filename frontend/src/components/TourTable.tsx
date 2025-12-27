// components/TourTable.tsx
import { useState } from "react";
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

type TourTableProps = {
  tours: Tour[];
  filterCountry?: string;
  filterDeparture?: string;
};

export default function TourTable({
  tours,
  filterCountry = "",
  filterDeparture = "",
}: TourTableProps) {
  const navigate = useNavigate();

  const filteredTours = tours.filter((tour) => {
    const matchesCountry =
      !filterCountry || tour.country?.trim() === filterCountry.trim();
    const matchesDate =
      !filterDeparture ||
      tour.departure_date?.trim() === filterDeparture.trim();
    return matchesCountry && matchesDate;
  });

  const INITIAL_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const visibleTours = filteredTours.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTours.length;
  const isExpanded = visibleCount > INITIAL_COUNT;

  const handleRowClick = (slug: string) => navigate(`/tours/${slug}`);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);
  const handleCollapse = () => setVisibleCount(INITIAL_COUNT);

  const formatPrice = (price: number | string | null | undefined) => {
    if (!price) return "—";
    const num = Number(String(price).replace(/,/g, ""));
    return isNaN(num) ? "—" : num.toLocaleString();
  };

  return (
    <div
      id="tour-table-container"
      className="w-full flex flex-col items-center px-[5%] "
    >
      <div className="text-center font-serif py-5">
        <h1 className="text-3xl">Ойрын Хугацааны Аялалууд</h1>
        <p className="text-sm mt-2">
          {filteredTours.length > 0
            ? `Хамгийн хямд аялалыг зөвхөн танд! Нийт ${filteredTours.length} аялал байна.`
            : "Аялал олдсонгүй..... Та өөр шалгуур ашиглан дахин оролдоно уу."}
        </p>
      </div>

      <div className="w-full grid grid-cols-1 gap-3 md:hidden">
        {visibleTours.map((tour) => (
          <div
            key={tour.id}
            role="button"
            tabIndex={0}
            onClick={() => handleRowClick(tour.slug || tour.id || "")}
            onKeyDown={(e) =>
              e.key === "Enter" && handleRowClick(tour.slug || tour.id || "")
            }
            className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 active:scale-[0.99] cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-50/30 via-transparent to-purple-50/30 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ring-1 ring-gray-200/50 dark:ring-gray-700/50">
                  <img
                    src={tour.cover_photo || "/placeholder-tour.jpg"}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50 text-sm leading-snug mb-1.5 line-clamp-2">
                    {tour.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 text-[11px] font-medium text-gray-700 dark:text-gray-300">
                    <svg
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {tour.duration_day} өдөр
                  </span>
                </div>
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

      <div className="hidden md:block w-full max-w-[1400px]">
        <div className="overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="border-b border-gray-100 dark:border-gray-800 hover:bg-transparent">
                <TableHead className="w-[320px] py-4 pl-8 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Аяллын нэр
                </TableHead>
                <TableHead className="w-[140px] py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Эхлэх өдөр
                </TableHead>
                <TableHead className="w-[140px] py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Өдөр, шөнө
                </TableHead>
                <TableHead className="w-[140px] py-4 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Дуусах өдөр
                </TableHead>
                <TableHead className="w-40 text-right py-4 pr-8 text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  1 хүний үнэ
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTours.map((tour, idx) => (
                <TableRow
                  key={tour.id}
                  onClick={() => handleRowClick(tour.slug || tour.id || "")}
                  className="group cursor-pointer border-b border-gray-50 dark:border-gray-800/50 transition-all duration-200 hover:bg-linear-to-r hover:from-gray-50/50 hover:to-transparent dark:hover:from-gray-800/30 dark:hover:to-transparent"
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <TableCell className="py-4 pl-8">
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-gray-200/50 dark:ring-gray-700/50 transition-all duration-300 group-hover:ring-2 group-hover:ring-blue-500/30 dark:group-hover:ring-blue-400/30">
                        <img
                          src={tour.cover_photo || "/placeholder-tour.jpg"}
                          alt={tour.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent"></div>
                      </div>
                      <span className="text-[15px] font-medium text-gray-900 dark:text-gray-50 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {tour.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tour.departure_date}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 px-3 py-1.5 ring-1 ring-amber-200/50 dark:ring-amber-800/50">
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                        </svg>
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                          {tour.duration_day}
                        </span>
                      </div>
                      <span className="text-gray-400 dark:text-gray-600">
                        ·
                      </span>
                      <div className="flex items-center gap-1">
                        <svg
                          className="h-3 w-3 text-indigo-600 dark:text-indigo-400"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">
                          {tour.duration_night}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {tour.arrival_date}
                  </TableCell>
                  <TableCell className="text-right py-4 pr-8">
                    <span className="inline-flex items-baseline gap-0.5 text-base font-bold bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
                      ₮{formatPrice(tour.single_supply_price || "")}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {filteredTours.length > 0 && (
        <div className="mt-10 flex justify-center gap-3">
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className="group relative overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 dark:shadow-blue-900/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 dark:hover:shadow-blue-900/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="relative z-10 flex items-center gap-2">
                Цааш үзэх
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
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
              className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 shadow-sm transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <span className="flex items-center gap-2">
                Хураах
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
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
      )}
    </div>
  );
}
