import { Utensils, Soup, Coffee, Calendar, Info } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { phuketHutulburt } from "@/data/hutulbur/hutulburtBagtsan";
import IncludedCard from "./IncludedCard";
const galleryImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766991491/D0_97_D0_90_D0_A1_D0_A1_D0_90_D0_9D-_D0_9F_D0_A3_D0_9A_D0_95_D0_A2-_D0_90_D0_AF_D0_9B_D0_90_D0_9B_fazxcj.png",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766991570/MTAyLmpwZw_rcbxdn.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766991560/Mjc2LmpwZw_lpho5w.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766991541/banana-beach_ex8mjo.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766991517/freedom-beach_lnbjq9.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766991531/SklfMDMzNC5qcGc_g92wot.jpg",
];

const hotelImages = [
  "https://reserving.com/hotels/asia/thailand/phuket/patong-beach/the-nature-phuket",
  "https://pix10.agoda.net/hotelImages/665/66535/66535_15090414070035721416.jpg",
  "https://images.trvl-media.com/lodging/2000000/1640000/1637800/1637723/9f5dc7a3.jpg",
];

const Phuket = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchPhuketTable = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/price_table/phuket");
      setTable(res.data.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPhuketTable();
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
      title: "Улаанбаатар – Пхукет",

      route: [
        { name: "Улаанбаатар", distance: "4,300 км", duration: "6 цаг" },
        { name: "Пхукет" },
      ],
      description: [
        "Чингис хаан олон улсын нисэх онгоцны буудал дээр цугларч бүртгэл хийнэ.",
        "Улаанбаатар – Пхукет чиглэлд шууд нислэгээр ниснэ.",
        "Пхукет олон улсын нисэх онгоцны буудалд газардаж хөтөч тосон авч зочид буудалд хүргэнэ.",
        "Буудалдаа байрлаад амарна.",
      ],
      meals: {
        dinner: "Оройн хоол",
      },
    },
    {
      day: 2,
      title: "Чөлөөт өдөр – Далайн эрэг",

      description: [
        "Патонг, Ката, Карон далайн эргээр чөлөөтэй амарна.",
        "Далайн усанд сэлэх, наран шарлага, SPA, массаж хийлгэх боломжтой.",
        "Орой нь Патонг гудамжаар зугаална.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
    },
    {
      day: 3,
      title: "Phi Phi арлын бүтэн өдрийн аялал",

      description: [
        "Хурдан завиар Phi Phi арлууд руу аялна.",
        "Maya Bay, Monkey Beach, Viking Cave үзнэ.",
        "Далайн усанд шумбах, зураг авах боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
    },
    {
      day: 4,
      title: "Phuket хотын аялал",

      description: [
        "Big Buddha хөшөө үзнэ.",
        "Phuket Old Town – хуучин хотын аялал.",
        "Cashew nut factory болон сувдны дэлгүүр орно.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
    },
    {
      day: 5,
      title: "James Bond Island",
      date: "2025.12.24 (Лхагва)",
      description: [
        "Phang Nga булангаар завиар аялна.",
        "James Bond Island дээр зураг авна.",
        "Каноэ завиар агуйгаар аялна.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
    },
    {
      day: 6,
      title: "Чөлөөт өдөр",

      description: [
        "Чөлөөт өдөр – shopping, spa, далайн эрэг.",
        "Нэмэлт аялал авах боломжтой (elephant trekking, ATV гэх мэт).",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
    },
    {
      day: 7,
      title: "Пхукет – Улаанбаатар",

      route: [
        { name: "Пхукет", distance: "4,300 км", duration: "6 цаг" },
        { name: "Улаанбаатар" },
      ],
      description: [
        "Буудлаа хүлээлгэн өгнө.",
        "Пхукет олон улсын нисэх онгоцны буудал руу явна.",
        "Улаанбаатар хотод газардаж аялал өндөрлөнө.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 font-sans">
      <div className="space-y-6">
        {tourData.map((tour) => (
          <div
            key={tour.day}
            className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-700">{tour.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Өдөр {tour.day}
              </div>
            </div>

            {tour.route && (
              <div className="mb-4 border-l-2 border-dashed border-amber-400 pl-4 space-y-2">
                {tour.route.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-medium">{r.name}</span>
                    {r.distance && (
                      <span className="text-xs text-gray-500">
                        {r.distance} · {r.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 mb-4">
              {tour.description.map((d, i) => (
                <p key={i} className="text-sm text-gray-600 dark:text-gray-300">
                  • {d}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t">
              {tour.meals?.breakfast && (
                <div className="flex items-center gap-2 text-sm">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  {tour.meals.breakfast}
                </div>
              )}
              {tour.meals?.lunch && (
                <div className="flex items-center gap-2 text-sm">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  {tour.meals.lunch}
                </div>
              )}
              {tour.meals?.dinner && (
                <div className="flex items-center gap-2 text-sm">
                  <Soup className="w-4 h-4 text-amber-600" />
                  {tour.meals.dinner}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-lg">Phuket Tour Highlights</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-2 text-sm">
            {[
              "Улаанбаатар – Пхукет шууд нислэг",
              "4-5 одтой далайн эргийн зочид буудал",
              "Phi Phi & James Bond Island",
              "Хотын аялал + чөлөөт өдрүүд",
              "Мэргэжлийн хөтөч",
            ].map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div> */}
        <IncludedCard arr={phuketHutulburt} />
      </div>

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
                Тайланд - Пүкет аялалуудын хуваарь
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
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center ">Хөөрөх өдөр</div>
                    </th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-2">Суудлын тоо</div>
                    </th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        Зочид буудал
                      </div>
                    </th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Том хүн</div>

                      <div>(+12)</div>
                    </th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Хүүхэд(2-11) ор эзэлсэн
                    </th>
                    <th className="text-left py-2 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Хүүхэд(2-11) ор эзлээгүй
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {table.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200">
                      <td className="py-1 px-2">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(item.departure_date).toLocaleDateString(
                                "mn-MN",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-1 px-2 text-gray-900 dark:text-gray-100">
                        {item.availability}
                      </td>
                      <td className="py-1 px-2 text-gray-900 dark:text-gray-100">
                        {item.hotel}
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮{Number(item.adult_price).toLocaleString("mn-MN")}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(
                            item.child_two_to_eleven_with_bed
                          ).toLocaleString("mn-MN")}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(
                            item.child_two_to_eleven_no_bed
                          ).toLocaleString("mn-MN")}
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
                  {item.availability}
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
                  <p> Нэмэлт төлбөрийн мэдээлэл</p>
                  <p>Нярай: 500,000₮ онгоцны такс төлнө</p>
                  <p>Өрөөнд ганцаараа орох нэмэгдэл: 1,200,000₮</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { galleryImages as phuketGallery, hotelImages as phuketHotel };
export default Phuket;
