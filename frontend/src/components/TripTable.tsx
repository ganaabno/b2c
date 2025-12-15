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

export default function TripTable() {
  const navigate = useNavigate();
  
  const INITIAL_COUNT = 10;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // --- MOCK DATA ---
  const trips = Array.from({ length: 45 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? "Туркийн 3 хот" : "Дубайн аялал",
    slug: `/tours/trip-${i + 1}`,
    image: "https://nomadays.scdn4.secure.raxcdn.com/mn2-public/antalya_duden_waterfall-FILL-w50h50.jpg",
    startDate: "2025-12-14",
    startDay: "Ням гараг",
    duration: "8 өдөр",
    price: i % 2 === 0 ? "4,590,000₮" : "3,200,000₮",
    endDate: "2025-12-21",
  }));

  const handleRowClick = (slug:string) => navigate(slug);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 10);
  const handleCollapse = () => setVisibleCount(INITIAL_COUNT);

  const visibleTrips = trips.slice(0, visibleCount);
  const hasMore = visibleCount < trips.length;
  const isExpanded = visibleCount > INITIAL_COUNT;

  return (
    <div id="trip-table-container" className="w-full flex flex-col items-center px-[5%] py-8">
      
      {/* --- MOBILE VIEW (Cards) - Stays 100% width --- */}
      <div className="w-full grid grid-cols-1 gap-3 md:hidden">
        {visibleTrips.map((trip) => (
          <div 
            key={trip.id} 
            onClick={() => handleRowClick(trip.slug)}
            className="relative overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-all active:scale-[0.98] active:bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <img src={trip.image} alt={trip.name} className="h-full w-full object-cover" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">{trip.name}</h3>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                  {trip.duration}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <div>
                <p className="text-gray-500">Эхлэх</p>
                <p className="font-medium text-gray-900">{trip.startDate}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Үнэ</p>
                <p className="font-bold text-blue-600 text-sm">{trip.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- DESKTOP VIEW (Shadcn Table) --- */}
      {/* Removed w-full and max-w-1300px to let table size itself naturally */}
      <div className="hidden md:block">
        <Table className="min-w-[800px]"> 
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-gray-100">
              {/* Added specific widths to control spacing */}
              <TableHead className="w-[300px] py-3 text-gray-600 font-semibold pl-4">Аяллын нэр</TableHead>
              <TableHead className="w-[150px] py-3 text-gray-600 font-semibold">Эхлэх өдөр</TableHead>
              <TableHead className="w-[100px] py-3 text-gray-600 font-semibold">Өдөр</TableHead>
              <TableHead className="w-[150px] py-3 text-gray-600 font-semibold">Дуусах өдөр</TableHead>
              <TableHead className="w-[150px] text-right py-3 text-gray-600 font-semibold pr-4">1 хүний үнэ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleTrips.map((trip) => (
              <TableRow 
                key={trip.id} 
                onClick={() => handleRowClick(trip.slug)}
                className="
                  cursor-pointer border-b border-gray-50
                  transition-all duration-200 ease-in-out
                  hover:bg-blue-50/40 hover:shadow-sm
                  group
                "
              >
                <TableCell className="py-2.5 font-medium pl-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-gray-900 group-hover:text-blue-700 transition-colors">
                      {trip.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="flex flex-col leading-tight">
                    <span className="text-gray-900">{trip.startDate}</span>
                    <span className="text-[11px] text-gray-400">{trip.startDay}</span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                    {trip.duration}
                  </span>
                </TableCell>
                <TableCell className="py-2.5 text-gray-600">
                  {trip.endDate}
                </TableCell>
                <TableCell className="text-right py-2.5 pr-4">
                  <span className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                    {trip.price}
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
            className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-blue-500 hover:text-blue-600 hover:shadow-md active:scale-95"
          >
            <span>Цааш үзэх</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {isExpanded && (
          <button
            onClick={handleCollapse}
            className="group flex items-center gap-2 rounded-full border border-gray-100 bg-gray-50 px-6 py-2 text-sm font-medium text-gray-600 shadow-sm transition-all hover:bg-gray-100 hover:text-gray-900 hover:shadow-md active:scale-95"
          >
            <span>Хураах</span>
            <svg className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        )}
      </div>

    </div>
  );
}