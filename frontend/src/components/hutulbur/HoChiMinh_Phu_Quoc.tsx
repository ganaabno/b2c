import {
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  Soup,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import IncludedCard from "./IncludedCard";
import { hochiminhPhuquocHutulburt } from "@/data/hutulbur/hutulburtBagtsan";

const HoChiMinh_Phu_Quoc = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchTable = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/price_table/ho_chi_minh_phu_quoc");
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
    fetchTable();
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
      title: "Улаанбаатар - Хо Ши Мин",

      route: [
        { name: "Улаанбаатар ", distance: "4100 км", duration: "5 цаг 30 мин" },
        { name: "Хо Ши Мин" },
      ],
      description: [
        "Чингис Хаан олон улсын онгоцны буудалд өглөөний 09:00 цагт үдэгчтэй уулзаж мэдээлэл аваад бүртгэлээ хийлгэнэ.",
        "МИАТ компаний нислэгээр 12:15 цагт хөөрч Хо Ши Мин хотын Тан Со Нат (Tan Son Nhat) олон улсын онгоцны буудалд 17:45 цагт газардана.",
        "Уг хот Вьетнамын бизнесийн төв ба олноо Сайгон хэмээн нэрлэгддэг. Мөн хамгийн нүд эрээлжилмээр хот гэгддэг. Буудалдаа буугаад хөтөчтэй цаг товлож цуглан Хо Ши Мин хотын алдартай шөнийн гудамжаар зугаалж оройн хоолоо идээд буудалдаа очиж амарна.",
      ],
      meals: { dinner: "Оройн хоол" },
      accommodation: " Eastin Grand Saigon",
    },
    {
      day: 2,
      title: "Хо Ши Мин - Фукуок",
      route: [
        { name: "Хо Ши Мин", distance: "270 км", duration: "1 цаг " },
        { name: "Фукуок" },
      ],

      description: [
        "Хо Ши Мин хотоос Фукуок арал руу дотоодын нислэгээр ниснэ. Нислэг 1 цаг үргэлжлэнэ.",
        "Фукуок аралд газардаад зочид буудалдаа хүргүүлж амарна. Бидний байрлах буудал нь Фукуок арлын хойд хэсэгт байрлах аялагчид хамгийн их зорин очдог алдарт хоол, үйлчилгээ, худалдааны төвлөрөл болсон Grand World-Little Venice цогцолборын хажууд байрлах тул өдрийн аялал дууссаны дараа орой бүр шоу үзэж, амтат хоол идэн, массаж хийлгэн алжаалаа тайлах боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "Vinholidays Fiesta Phu Quoc ",
    },
    {
      day: 3,
      title: "VINWONDER PARK, SAFARI, GRAND WORLD",

      description: [
        "Вьетнам улсын хамгийн том зугаа цэнгэлийн парк болох Vinwonder park дээр тоглоно.",
        "Энэхүү парк нь 170,000 мкв талбайг эзлэх ба олон төрлийн сэдэвчилсэн, томоохон уран зөгнөлт хэсгүүд, адал явдалт тоглоомын талбай, усан парк, экстрем тоглоом, соёлын шоу зэрэг олон төрлийн үзвэр үйлчилгээтэй.",
        "Өдрийн хоолны дараа бид зүүн өмнөд Азийн хамгийн том амьтны хүрээлэнгээр зугаалах ба орой нь Grand world Little Venice-ээр зугаална.",
        "Орой бүр гэрлийн лазер шоу болдог.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай", lunch: "Өдрийн хоол" },
      accommodation: "Vinholidays Fiesta Phu Quoc",
    },
    {
      day: 4,
      title: "Чөлөөт өдөр",

      description: [
        "Чөлөөт өдрөөр далайн эрэг дээр нар жаргахыг харж, казино орж цагийг зугаатай өнгөрүүлэх боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "Vinholidays Fiesta Phu Quoc",
    },
    {
      day: 5,
      title: "Хонтом Арал - Усан Парк",

      description: [
        "Өглөөний цайны дараа бид Хон Том аралруу дэлхийн хамгийн урт дүүжин гүүрээр явж тэндээ бүтэн өдөр усан парк дээр тоглох ба өдрийн хоолоо зооглоно.",
        "Хүсвэл та оройн хоолоо далайн эрэг дээр идэж лазер шоу үзэх болон Kiss Bridge ээр зочлох боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай", lunch: "Өдрийн хоол" },
      accommodation: "Vinholidays Fiesta Phu Quoc ",
    },
    {
      day: 6,
      title: "Фукуок - Хо Ши Мин",
      route: [
        { name: "Фукуок ", distance: "270 км", duration: "1 цаг " },
        { name: "Хо Ши Мин" },
      ],
      description: [
        "Өглөөний цайны дараа бид Хо Ши Мин хот руу дотоодын нислэгээр буцна.",
        "Хо Ши Минд газардаад зочид буудалдаа хүргүүлж амарч болно мөн аяллын хөтчөөс зочилж болох газруудын хаяг болон мэдээллийг авч чөлөөт аялал хийж болно.",
      ],
      meals: {
        breakfast: "Өглөөний цай",
      },
      accommodation: "Eastin Grand Saigon",
    },
    {
      day: 7,
      title: "Хо Ши Минд дэлгүүр хэсэх",
      description: [
        "Шоппинг хийж өдрийг өнгөрүүлж болно. Ben Thanh Market – хямд үнэтэй бараа жуулчдын очдог газар.",
        "Vincom Center – брэндийн бараанууд тансаг зэрэглэлийн их дэлгүүр.",
        "Sai Gon Square – дундаж давхаргын илүү очдог газар.",
        "Diamond Plaza – шинээр байгуулагдсан худалдааны төв гэх мэт.",
        "Түүнээс гадна манай орчуулагч хөтөч нар таны хүссэн бараатай газрыг нарийвчлан зааж өгөх болно.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "Eastin Grand Saigon",
    },

    {
      day: 8,
      title: "Хо Ши Мин - Улаанбаатар",
      route: [
        { name: "Хо Ши Мин  ", distance: "4100 км", duration: "6 цаг " },
        { name: "Улаанбаатар" },
      ],
      description: [
        "Бид өглөөний цайны цагийн дараа буудлаа хүлээлгэж өгөөд чөлөөт цаг гарна.",
        "Буцах нислэг орой байгаа тул энэ үед хотоор зугаалах, шоппинг хийх боломжтой. Орой нь олон улсын нисэх онгоцны буудалд 16:00 цагт хүргүүлж бүртгэлээ хийлгээд 19:05 цагт Улаанбаатар хот руу ниснэ. Чингис Хаан олон улсын нисэх онгоцны буудалд шөнийн 02:20 цагт газардаж бидний аз жаргалтай, дурсамж дүүрэн аялал өндөрлөнө.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "Eastin Grand Saigon",
    },
  ];

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-4  font-sans">
      <div className="space-y-6">
        {tourData.map((tour) => (
          <div
            key={tour.day}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
            <div className="p-6 flex-1 flex flex-col">
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
        <IncludedCard arr={hochiminhPhuquocHutulburt} />
      </div>
      {/* -------------- TABLE ----------- */}
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
                Хо Ши Мин - Фукуок аялалуудын хуваарь
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
                      <div>Том хүн</div>

                      <div>(+12)</div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Хүүхэд</div>
                      <div>(5-11)</div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Хүүхэд</div>
                      <div>(2-4)</div>
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
                          ₮{Number(item.adult_price).toLocaleString("mn-MN")}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(item.child_five_to_eleven).toLocaleString(
                            "mn-MN"
                          )}
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
                          ₮
                          {Number(item.child_two_to_four).toLocaleString(
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

export default HoChiMinh_Phu_Quoc;
