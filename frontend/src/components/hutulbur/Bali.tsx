import {
  Utensils,
  BedDouble,
  Coffee,
  Info,
  ArrowRight,
  Banknote,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Bali = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchBaliTable = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/price_table/bali");
      setTable(res.data.data);
      console.log("RES:", res.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBaliTable();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!table) return <div></div>;

  if (!Array.isArray(table)) {
    return <div>Data format error</div>;
  }

  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Ханой",
      date: "2025.12.27 (Бямба)",
      cover_photo: "https://placehold.co/600x400/87CEEB/ffffff?text=Bangkok",
      location: "Улаанбаатар City",
      route: [
        { name: "Улаанбаатар ", distance: "3822km", duration: "4 цаг" },
        { name: "Ханой" },
      ],
      description: [
        "05:00 Аялагчид Хөшигийн хөндийн “Чингис Хаан” олон улсын нисэх онгоцны буудалд ирсэн байна.",
        "08:00 – 12:00 Улаанбаатар – Ханой нислэг",
        "14:00 Ханой хотын зочид буудалд байрлана",
        "Аялагчид нийтдээ 2 өдөр 2 шөнө Вьетнам улсын Ханой хотод байрлан амарна.",
      ],
      meals: { lunch: "Restaurant" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 2,
      title: "Pattaya Tour",
      date: "2025.12.28 (Ням)",
      cover_photo: "https://placehold.co/600x400/8B4513/ffffff?text=Pattaya",
      location: "Pattaya City",
      description: [
        "06:00-07:00 Өглөөний цай",
        "07:30 цагт Зочид буудлын өрөөг хүлээлгэж өгөн Ной Бай олон улсын нисэх буудал руу хөдөлнө",
        "10:05-16:25 Ханой-Бали нислэг",
        "18:00-18:30 Зочид буудалд байрлана",
        "Аялагчид нийтдээ 5 өдөр 5 шөнө Индонез улсын Бали аралд байрлан амарна.",
      ],
      meals: { breakfast: "Hotel breakfast", lunch: "Restaurant" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 3,
      title:
        "БҮТЭН ӨДРИЙН УБУД ХОТЫН АЯЛАЛ + KINTAMANI ГАЛТ УУЛЫН АЯЛАЛ/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.29 (Даваа)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "08:00 Өглөөний цай",
        "Ubud Palace – Түүхэн дурсгалт хааны ордон",
        "Uma Pakel Swing дүүжин – Нутгийн кофег амтлан шувууны үүрэнд зураг даруулах боломжтой",
        "Tampak Siring хот – Tirta Empul ариун усны сүм",
        "Tegalalang тосгон – Будааны дэнж",
        "Batur галт уул болон Batur нуур",
      ],
      meals: { lunch: "Restaurant", dinner: "Included" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 4,
      title:
        "БҮТЭН ӨДРИЙН BEDUGUL ХЭСГИЙН АЯЛАЛ + TANAH LOT/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.30 (Мягмар)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "08:00 Өглөөний цай",
        "Mengwi тосгон – Taman Ayun язгууртны гэр бүлийн сүм",
        "Bratan нуур – Ulun Danu усан дээрх хөвдөг сүм",
        "Tanah Lot сүт",
      ],
      meals: { lunch: "Restaurant", dinner: "Included" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 5,
      title: "ХАГАС ӨДӨР WATER BOM PARK + ЧӨЛӨӨТ ЦАГ/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.31 (Лхагва)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: ["08:00 Өглөөний цай"],
      meals: {},
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 6,
      title:
        "БҮТЭН ӨДРИЙН ТЭНГЭРИЙН ХААЛГА БОЛОН TIRTA GANGGA УСАН ОРДОНГИЙН АЯЛАЛ/ӨДӨР& ОРОЙН ХООЛ/",
      date: "2025.1.1 (Пүрэв)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "08:00 Өглөөний цай",
        "The Heaven Gate – Бали арлын зүүн зүгт байрлах Lempuyang The Heaven’s Gate буюу Тэнгэрийн хаалгыг зорино",
        "Tirta Gangga – Хааны усан ордон",
      ],
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Restaurant",
        dinner: "Restaurant",
      },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 7,
      title: "",
      date: "2025.1.2 (Баасан)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "07:00-08:00 Өглөөний цай",
        "11:00 Аялагчид зочид буудлын өрөөгөө хүлээлгэж өгөн Ngurah Rai олон улсын нисэх буудал руу хөдөлнө.",
        "13:10-17:20 Бали-Ханой нислэг",
        "19:00 Зочид буудалд байрлана",
      ],
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Restaurant",
        dinner: "Restaurant",
      },
      accommodation: "Jomtien Palm Beach Hotel",
    },

    {
      day: 8,
      title: "Сүүлийн өдөр",
      date: "2025.1.3 (Бямба)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "07:00-08:00 Өглөөний цай",
        "08:30 Аялагчид зочид буудлын өрөөгөө хүлээлгэж өгөн Ной Бай олон улсын нисэх буудал руу хөдөлнө",
        "13:00-19:00 Ханой-Улаанбаатар нислэг",
      ],
      meals: {
        breakfast: "Hotel breakfast",
        lunch: "Restaurant",
        dinner: "Restaurant",
      },
      accommodation: "Jomtien Palm Beach Hotel",
    },
  ];

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans">
      <div className=" ">
        <div className="space-y-6">
          {tourData.map((tour) => (
            <div
              key={tour.day}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
              {/* Right: Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Card Header */}
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h2 className="text-xl font-bold text-amber-700 dark:text-amber-500">
                      {tour.title}
                    </h2>
                    <div className="absolute top-3 right-3 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                      Day {tour.day}
                    </div>
                  </div>
                </div>

                {/* Route Visualization (Dotted Line Style) */}
                {tour.route && (
                  <div className="mb-6 pl-2 border-l-2 border-dashed border-amber-300 dark:border-amber-700/50 space-y-4">
                    {tour.route.map((stop, index) => (
                      <div key={index} className="relative pl-4">
                        {/* Dot on the line */}
                        <div className="absolute -left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-gray-800" />

                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                            {stop.name}
                          </span>
                          {stop.distance && (
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded border border-amber-100 dark:border-amber-800/30">
                              <span>{stop.distance}</span>
                              <ArrowRight className="h-3 w-3 mx-1 opacity-50" />
                              <span>{stop.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Description Text */}
                <div className="mb-4 space-y-2">
                  {tour.description?.map((desc, index) => (
                    <p
                      key={index}
                      className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex gap-3 items-start">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 shrink-0" />
                      {desc}
                    </p>
                  ))}
                </div>

                {/* Footer: Meals & Accommodation */}
                <div className=" pt-2 border-t border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 md:gap-6">
                  {tour.meals && (
                    <div className="flex items-center gap-4">
                      {tour.meals.breakfast && (
                        <div
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          title="Breakfast">
                          <Coffee className="h-4 w-4 text-amber-600" />
                          <span>{tour.meals.breakfast}</span>
                        </div>
                      )}
                      {tour.meals.lunch && (
                        <div
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          title="Lunch">
                          <Utensils className="h-4 w-4 text-amber-600" />
                          <span>{tour.meals.lunch}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {tour.accommodation && (
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-gray-600">
                      <BedDouble className="h-4 w-4 text-amber-600" />
                      <span>{tour.accommodation}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Summary Footer */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800/30">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-bold text-amber-800 dark:text-amber-400">
                Tour Highlights (Eniig zasna)
              </h3>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                "Round-trip flights from Ulaanbaatar to Bangkok",
                "3-star beach hotel accommodation",
                "Daily breakfast and lunch included",
                "Professional tour guide",
                "All entrance fees and activities included",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          {table && (
            <div className="mt-8 mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Бали аялалуудын хуваарь
                  </h2>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Нийт {table.length} аялал
                </span>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            Хөөрөх өдөр
                          </div>
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            Суудлын тоо
                          </div>
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                          <div className="flex items-center gap-2">
                            <Banknote size={30} />
                            <div>Том хүн(+12)</div>
                          </div>
                        </th>
                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {table.map((item, index) => (
                        <tr
                          key={item.id || index}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                          <td className="py-1 px-6">
                            <div className="flex items-center">
                             
                              <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(
                                    item.departure_date
                                  ).toLocaleDateString("mn-MN", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-1 px-4 text-gray-900 dark:text-gray-100">{item.availability}</td>
                          <td className="py-1 px-6">
                            <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                              ₮
                              {Number(item.adult_price).toLocaleString("mn-MN")}
                            </div>
                            
                          </td>
                          {/*ZAHIALAH BUTTON ESVEL UUR ZUIL */}
                          {/* <td className="py-4 px-6">
                  <button className="inline-flex items-center px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                    Захиалах
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4">
                {table.map((item, index) => (
                  <div
                    key={item.id || index}
                    className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="h-8 w-8 shrink-0 bg-sky-100 dark:bg-sky-900/30 rounded-lg flex items-center justify-center mr-2">
                          <span className="text-sky-600 dark:text-sky-400 font-bold text-sm">
                            {new Date(item.departure_date).getDate()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {new Date(item.departure_date).toLocaleDateString(
                              "mn-MN",
                              {
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(item.departure_date).toLocaleDateString(
                              "mn-MN",
                              {
                                weekday: "short",
                              }
                            )}
                          </div>
                        </div>
                      </div>
                      {item.availability &&
                      item.availability.includes("available") ? (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></div>
                          Боломжтой
                        </div>
                      ) : (
                        <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1"></div>
                          Дүүрсэн
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-700 pt-3">
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Үнэ
                        </div>
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮{Number(item.adult_price).toLocaleString("mn-MN")}
                        </div>
                      </div>
                      <button className="inline-flex items-center px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                        Захиалах
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Note Section */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-2 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      <strong className="font-semibold">Анхааруулга:</strong>{" "}
                      Дээрх үнэ нь зөвхөн насанд хүрсэн хүний 1 суудалд хамаарах
                      үнэ юм. Хүүхдийн үнэ, хямдрал болон нэмэлт үйлчилгээний
                      мэдээллийг манай зөвлөхтэй холбогдоно уу.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bali;
