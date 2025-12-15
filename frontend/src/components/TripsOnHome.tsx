
import React from "react";
import { useNavigate } from "react-router-dom";

export default function TripsOnHome() {
  const navigate = useNavigate();

  // Mock data
  const trips = [
    {
      id: 1,
      name: "Туркийн 3 хот",
      slug: "/tours/turkey-3-cities",
      image: "https://nomadays.scdn4.secure.raxcdn.com/mn2-public/antalya_duden_waterfall-FILL-w50h50.jpg",
      startDate: "2025-12-14",
      startDay: "Ням гараг",
      duration: "8 өдөр",
      price: "4,590,000₮",
      endDate: "2025-12-21",
    },
    {
      id: 2,
      name: "Туркийн 3 хот",
      slug: "/tours/turkey-3-cities-2",
      image: "https://nomadays.scdn4.secure.raxcdn.com/mn2-public/antalya_duden_waterfall-FILL-w50h50.jpg",
      startDate: "2025-12-14",
      startDay: "Ням гараг",
      duration: "8 өдөр",
      price: "4,590,000₮",
      endDate: "2025-12-21",
    },
  ];

  const handleRowClick = (slug:string) => {
    navigate(slug);
  };

  return (
    <div className="w-full flex justify-center px-[5%] py-8">
      <div className="w-full max-w-[1300px]">
        
        {/* --- MOBILE VIEW (Cards) --- */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {trips.map((trip) => (
            <div 
              key={trip.id} 
              onClick={() => handleRowClick(trip.slug)}
              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 active:scale-[0.98] active:bg-gray-50"
            >
              {/* Header: Image & Name */}
              <div className="mb-4 flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <img
                    src={trip.image}
                    alt={trip.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{trip.name}</h3>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {trip.duration}
                  </span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Эхлэх</p>
                  <p className="font-medium text-gray-900">{trip.startDate}</p>
                  <p className="text-xs text-gray-400">{trip.startDay}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Дуусах</p>
                  <p className="font-medium text-gray-900">{trip.endDate}</p>
                </div>
                <div className="col-span-2 border-t border-gray-100 pt-3 flex justify-between items-center">
                  <p className="text-xs text-gray-500">Үнэ (1 хүн)</p>
                  <p className="text-lg font-bold text-blue-600">{trip.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- DESKTOP VIEW (Table) --- */}
        <div className="hidden w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
          <table className="w-full table-auto text-left text-sm border-collapse">
            <thead className="bg-gray-50 text-gray-600">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-4 font-semibold">Аяллын нэр</th>
                <th className="px-6 py-4 font-semibold">Эхлэх өдөр</th>
                <th className="px-6 py-4 font-semibold">Өдөр</th>
                <th className="px-6 py-4 font-semibold">Дуусах өдөр</th>
                {/* Price moved to end and right aligned */}
                <th className="px-6 py-4 font-semibold text-right">1 хүний үнэ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {trips.map((trip) => (
                <tr 
                  key={trip.id} 
                  onClick={() => handleRowClick(trip.slug)}
                  className="
                    group cursor-pointer relative
                    transition-all duration-200 ease-in-out
                    hover:bg-blue-50/50 hover:shadow-md hover:z-10 hover:-translate-y-0.5
                    border-l-4 border-l-transparent hover:border-l-blue-500
                  "
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <img
                          src={trip.image}
                          alt={trip.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {trip.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{trip.startDate}</span>
                      <span className="text-xs text-gray-400">{trip.startDay}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                      {trip.duration}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{trip.endDate}</td>
                  
                  {/* Price Column - Now at the end */}
                  <td className="px-6 py-4 text-right">
                    <span className="font-bold text-gray-900 text-base group-hover:text-blue-700 transition-colors">
                      {trip.price}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Footer */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-3 text-right">
            <span className="text-xs text-gray-500">Нийт {trips.length} аялал олдлоо</span>
          </div>
        </div>

      </div>
    </div>
  );
}
