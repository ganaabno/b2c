import {
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  ArrowRight,
  Soup,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const galleryImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767002054/Bangkok_qefn2v.png",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076170/Bangkok2_asrwta.webp",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076177/Bangkok1_xswxjm.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076178/Bangkok5_e900wa.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076178/Bangkok3_e4erlu.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076193/Bangkok4_lfqcbi.jpg",
];

const hotelImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990424/ad0eaa78f83f17e07ceaca9788fc1007_wuxidg.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
];

const Thailand_Banggok = () => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fetchBanggokTable = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/price_table/thailand_banggok");
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
    fetchBanggokTable();
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
      title: "Улаанбаатар - Бангкок",
      route: [
        { name: "Улаанбаатар ", distance: "2570 км", duration: "5 цаг" },
        { name: "Бангкок", distance: "150 км", duration: "2 цаг" },
        { name: "Паттаяа" },
      ],
      description: [
        "Чингис Хаан нисэх онгоцны буудалд өглөөний 05:00 цагт цугларч үдэгчээс заавар аван бүртгэлээ хийлгэнэ.",
        "Бүртгэлээ хийлгээд МИАТ компаний нислэгээр 08:45 цагт хөөрч БАНГКОК хот руу ниснэ.",
        "Бангкокын онгоцны буудал Суварнабумд 13:45 цагт газардаж хилээр нэвтрээд Тайланд улсын аялал жуулчлалын 4 бүсийн нэг болох Паттаяа хот руу автобусаар 2 цаг буюу 150км яваад зочид буудалдаа хүргүүлж амарна.",
      ],
      meals: { dinner: "Оройн хоол" },
      accommodation: "Fifth Pattaya Jomtien ",
    },
    {
      day: 2,
      title: "Nong Nooch, Gems Gallery, Laser Buddha",
      description: [
        "Үзэсгэлэнт Нон Нооч (Nong Nooch) үлэг гүрвэлийн цэцэрлэгт хүрээлэнг зорих ба замдаа бид Тайланд улсын хамгийн том үнэт эдлэлийн төв болох Жэмс Галлерай (Gems Gallery)-р зочилж шүр сувд худалдаж авах боломжтой ба галт тэрэгний сонирхолтой аялал хийнэ.",
        "Өдрийн хоолны дараагаар Нон Нооч (Nong Nooch) цэцэрлэгт хүрээлэнгээр зугаалж Тай үндэсний соёлын шоу болон зааны шоу зэргийг үзнэ.",
        "Үүний дараагаар 108м Лазер будда бурхан (Laser Buddha) цэцэрлэгт хүрээлэнгээр зугаална.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "Fifth Pattaya Jomtien",
    },
    {
      day: 3,
      title: "Шүрэн арал, Koh Larn, Lady Boy, Моторт завь",
      description: [
        "Моторт завиар Шүрэн арал (Koh Larn) руу явна. Энэ шүрэн арал нь далайн эргийн амралтад тохирсон нунтаг цагаан элс, бүлээн устай, нар шарсан дээд зэрэглэлийн элстэй газар юм. Банана завь, усан дээгүүр шүхрээр нисэх, ус руу шумбах, мотоцикл, буудлага гэх мэт олон төрлийн зугаатай тоглоомууд бий.",
        "Өдрийн хоолыг арлын далайн хоолны ресторанд иднэ.",
        "Орой нь бид Паттаяа хот руу хурдны моторт завиараа буцна. Оройн хоолны дараа жуулчдын сонирхлыг татдаг зөвхөн Тайландад л харж болох (Lady Boy) кабаре шоу Алкасар тоглолтыг үзэж тэдэнтэй хамт зургаа авахуулна.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "Fifth Pattaya Jomtien",
    },
    {
      day: 4,
      title: "Чөлөөт өдөр",
      description: [
        "Та энэ өдөр өөрийн хүссэнээр амрах боломжтой.",
        "Паттаяа хотын шоу цэнгээний гудамж (Walking Street) –ээр зугаалж болно.",
        "Төрөл бүрийн зугаа цэнгээний газруудтай ба Паттаяа хотын шөнийн амьдралтай танилцаж цагийг зугаатай өнгөрөөх боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "Fifth Pattaya Jomtien",
    },
    {
      day: 5,
      title: "Siam Park, Кобра могойн тоглолт",
      route: [
        { name: "Паттаяа", distance: "150 км", duration: " " },
        { name: "Бангкок" },
      ],
      description: [
        "Өглөөний цайны дараа бид Бангкок хот руу хөдлөнө.",
        "Замдаа хорт могойн төвөөр орж Кобра могойн тоглолт үзүүлбэрийг үзнэ. Бангкок хотын захад нисэх буудлын ойролцоо байрлах Сиам (Siam Park) усан паркад экстрем тоглоом буюу усан гулгуур, галзуу хулгана зэрэг 30 гаруй тоглоомуудаас сонгон тоглож дэлхийн хамгийн том хиймэл давалгаатай усан сангийн эрэгт амрах боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "The Sukosol Hotel ",
    },
    {
      day: 6,
      title: "Бангкок хотын аялал, Grand Palace, Chao Rhaya, Bayoke Tower",

      description: [
        "Өглөөний цайны дараа Бангкок хотын аялалаа хийнэ. 1782 оноос баригдаж эхэлсэн, уран барилгын өвөрмөц хэв шинжийг хадгалсан Хааны ордон (Grand Palace) болон  Маргад Эрдэнийн Будда сүм (Emerald Buddha) –г үзнэ.",
        "Тайланд улсын үндэсний завиар Бангкок хотын дундуур урсах (Chao Rhaya) мөрнөөр аялал хийнэ. 104 м өндөр Үүрийн Туяа (Wat Arun) хэмээх хамгийн өндөр хийдийг завьнаас харна.",
        "Өдрийн хоолоо мөрний эрэг дээрх задгай ресторанд иднэ. Тайландын хамгийн өндөр барилга болох Баёоке цамхаг (Bayoke Tower) -ийн 76 давхарт байрлах шилэн ханатай олон үндэстний ресторанд оройн хоолоо идээд цамхагийн оройд байх эргэдэг шалтай алсыг харагч тавцан дээрээс үдшийн Бангкок хотыг харах боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "The Sukosol Hotel ",
    },
    {
      day: 7,
      title: "Шоппинг хийнэ",

      description: [
        "Энэ өдөр шоппинг хийж өнгөрүүлнэ. Siam Paragon – хамгийн том худалдааны төв, Central World – Дэлхийн шилдэг брэнд бүтээгдэхүүнүүд, BIG C – хямд бараа болон хүнсний төв, Indra Squire Bazaar – шөнийн зах. Зочид буудал худалдааны дүүрэгт байрлалтай.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "The Sukosol Hotel ",
    },

    {
      day: 8,
      title: "Бангкок - Улаанбаатар",
      route: [
        { name: "Бангкок ", distance: "2570 км", duration: "6 цаг 40 мин" },
        { name: "Улаанбаатар" },
      ],

      description: [
        "Орой нь бид Суварнабум нисэх онгоцны буудалдаа хүргүүлж Улаанбаатар хотын зүг 15:15 цагийн нислэгээр буцна. Улаанбаатар хотод 21:55 цагт онгоц газардаж аялал өндөрлөнө.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
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
            <div className="p-6 flex-1 flex flex-col">
              {/* Card Header */}
              <div className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <h2 className="text-xl font-bold text-amber-700 dark:text-amber-500">
                    {tour.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full w-fit">
                    <Calendar className="h-3.5 w-3.5 mr-2" />
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
                Тайланд - Бангкок аялалуудын хуваарь
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
                      <div>Хүүхэд(2-11)</div>
                      <div>ор эзэлсэн</div>
                    </th>
                    <th className="text-left py-4 px-2 text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      <div>Хүүхэд(2-11)</div>
                      <div>ор эзлээгүй</div>
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

export { galleryImages as bangkokImages, hotelImages as bangkokHotel };
export default Thailand_Banggok;
