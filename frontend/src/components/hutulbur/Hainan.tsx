/* eslint-disable react-refresh/only-export-components */
import {
  Utensils,
  Soup,
  BedDouble,
  Coffee,
  Calendar,
  ArrowRight,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import IncludedCard from "./IncludedCard";
import { hainanHutulburt } from "@/data/hutulbur/hutulburtBagtsan";
const galleryImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990242/sanya-beaches-700-3_wfkojz.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990341/Hainan-China-beach.jpg_bklugy.webp",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990353/Ocean-Breeze-and-Ease_inpost3.width-800_kagrb5.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990361/Atlantis-Sanya-Aquaventure-Sanya-43_oixici.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990370/Glass_Trestle_with_Full_Sea_View__28Yalong_Bay_Forest_Park_Glass_Bridge_29_in_July_2025_oswdbp.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990389/phoenix-park_qkjra2.jpg",
];

const hotelImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990424/ad0eaa78f83f17e07ceaca9788fc1007_wuxidg.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
];

const Hainan = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchHainanTable = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/price_table/hainan");
      setTable(res.data.data);
      console.log("RES:", res.data.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHainanTable();
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
      title: "Улаанбаатар - Саняа",

      location: "Улаанбаатар City",
      route: [
        { name: "Улаанбаатар ", distance: "3363 км", duration: "5 цаг" },
        { name: "Саняа" },
      ],
      description: [
        "19:45 цагт “Чингис хаан” олон улсын нисэх онгоцны буудал дээр цугларч үдэгчээс мэдээлэл авна.",
        "20:10 цагт Бүртгэл эхлэхээр суудлаа бичүүлнэ.",
        "22:10 цагт УБ-Саняа хотруу (5-н цаг) Хүннү эйрлайн шууд нислэг /онгоц нь хоолтой/",
        "03:10 цагт Саняа хотын Финикс олон улсын нисэх онгоцны буудалд буугаад хөтөч тосож буудалдаа хүргүүлж амарна.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
      accommodation: "",
    },
    {
      day: 2,
      title: "Чөлөөт өдөр",
      date: "2025.12.28 (Ням)",
      cover_photo: "https://placehold.co/600x400/8B4513/ffffff?text=Pattaya",
      location: "Pattaya City",
      description: [
        "Чөлөөт өдрүүдээр далайн эрэг орж цагийг өнгөрөөх, буудалдаа амрах, дэлгүүр хэсэх, нэмэлт сонирхолтой хөтөлбөр авах зэрэг бусад хүссэн зүйлсээ хийх боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "",
    },
    {
      day: 3,
      title: "Хөтөлбөрт өдөр",

      description: [
        "Аяллын автобус",
        "Товлосон цагт цугларч автобусандаа суун аварга загасны аж ахуйтай танилцана. 3-н давхар тансаг зэрэглэлийн усан онгоцоор Номхон далайд 3-н цаг аялна. Үүнд DJ, Karaoke, загасчлал, жимс, уух зүйлс, (хязгаартай) туршлагатай усан онгоцны баг зэрэг багтсан. Энэ аялалдаа та нэмэлтээр далайд шумбах, моторт завь, шүхэр, fly boarding зэрэг олон тоглоомууд тоглох боломжтой. (260-800 ЮАНЬ)",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "",
    },
    {
      day: 4,
      title: "Ойн парк",

      location: "Яанода ойн парк",

      description: [
        "Яанода ойн паркийн аялал. (нэмэлт төлбөртэй: шилэн гүүр (98yuan), 12 төрлийн экстрэм тоглоомууд болон уулнаас завьтай гулгаж буух боломжтой (198 yuan). Хятадын цайны соёлтой танилцаж Кунг Фу цай амтлана.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "",
    },
    {
      day: 5,
      title: "Чөлөөт өдөр. ",

      description: [
        "Чөлөөт өдрүүдээр далайн эрэг орж цагийг өнгөрөөх, буудалдаа амрах, дэлгүүр хэсэх, нэмэлт сонирхолтой хөтөлбөр авах зэрэг бусад хүссэн зүйлсээ хийх боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "",
    },
    {
      day: 6,
      title: "УСАН ПАРК ҮНЭГҮЙ",

      description: [
        "Товлосон цагт цугларч автобусандаа сууж аялалдаа гарна. Сувдны дэлгүүр ороод үүний дараа Дубайд салбартай ATLANTIS усан паркт очиж өдөржин хүссэнээрээ тоглоно.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",

        dinner: "Оройн хоол",
      },
      accommodation: "",
    },
    {
      day: 7,
      title: "Чөлөөт өдөр.",

      description: [
        "Чөлөөт өдрүүдээр далайн эрэг орж цагийг өнгөрөөх, буудалдаа амрах, дэлгүүр хэсэх, нэмэлт сонирхолтой хөтөлбөр авах зэрэг бусад хүссэн зүйлсээ хийх боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "",
    },

    {
      day: 8,
      title: "Чөлөөт өдөр",

      description: [
        "Чөлөөт өдрүүдээр далайн эрэг орж цагийг өнгөрөөх, буудалдаа амрах, дэлгүүр хэсэх, нэмэлт сонирхолтой хөтөлбөр авах зэрэг бусад хүссэн зүйлсээ хийх боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "",
    },
    {
      day: 9,
      title: "Сүүлийн өдөр",

      route: [
        { name: "Саняа", distance: "3363 км", duration: "5 цаг" },
        { name: "Улаанбаатар" },
      ],
      description: [
        "Тогтсон цагт буудлаа хүлээлгэж өгөөд Дэлхийн миссийн 53,54,55,57,60,67 дахь удаагийн тэмцээнийг зохион явуулсан Beauty Crown Center дээр очиж ГРУПП аялагч нартайгаа дурсгалын зураг татуулна.",
        "2138м cable car-аар зорчин Саняа хотын гэрэлт уул дээрх Үзэсгэлэнт Fenghuangling Sea Oath уулын байгалийн цогцолборт газрыг үзнэ.",
        "17:00 цагт Саняа Финикс нисэх онгоцны буудал дээр ирж бүртгэлээ хийлгэнэ.",
        "20:10 цагт Улаанбаатар чиглэлд нисээд шөнийн 01:10 цагт газардаж бидний аялал өндөрлөнө.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        dinner: "Оройн хоол",
      },
      accommodation: "",
    },
  ];

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-4 font-sans">
      <div className="space-y-6">
        {tourData.map((tour) => (
          <div
            key={tour.day}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
            {/*Content Section */}
            <div className="px-6 py-4 flex-1 flex flex-col">
              {/* Card Header */}
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h2 className="text-xl font-bold text-amber-700 dark:text-amber-500">
                    {tour.title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    Өдөр {tour.day}
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
                    {tour.meals.dinner && (
                      <div
                        className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        title="Dinner">
                        <Soup className="h-4 w-4 text-amber-600" />
                        <span>{tour.meals.dinner}</span>
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

        <IncludedCard arr={hainanHutulburt} />
      </div>
      {/* Hutulburt orson */}

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
                Хайнан аялалуудын хуваарь
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
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center ">Хөөрөх өдөр</div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center gap-2">Суудлын тоо</div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex">Том хүн </div>

                      <div className="flex gap-1">
                        <div> (+12)</div>
                        <div className="flex items-center">
                          5<Star size={15} />
                        </div>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex">Том хүн </div>

                      <div className="flex gap-1">
                        <div> (+12)</div>
                        <div className="flex items-center">
                          4<Star size={15} />
                        </div>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Хүүхэд</div>
                      <div className="flex gap-1">
                        <div> (6-11)</div>
                        <div className="flex items-center">
                          5<Star size={15} />
                        </div>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Хүүхэд</div>
                      <div className="flex gap-1">
                        <div> (6-11)</div>
                        <div className="flex items-center">
                          4<Star size={15} />
                        </div>
                      </div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Хүүхэд</div>
                      <div>(2-5)</div>
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
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(item.five_star_adult_price).toLocaleString(
                            "mn-MN"
                          )}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(item.four_star_adult_price).toLocaleString(
                            "mn-MN"
                          )}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(
                            item.five_star_child_six_to_eleven
                          ).toLocaleString("mn-MN")}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(
                            item.four_star_child_six_to_eleven
                          ).toLocaleString("mn-MN")}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(item.child_two_to_five).toLocaleString(
                            "mn-MN"
                          )}
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
                  Бусад мэдээлэл:
                  <p>0-2 нас: 450,000₮</p>
                  <p>Ганцаараа орох нэмэгдэл: 900,000₮</p>
                  <p>Ор нэмүүлэх төлбөр: 500,000₮</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { galleryImages as hainanGallery, hotelImages as hainanHotel };
export default Hainan;
