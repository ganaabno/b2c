import {
  Soup,
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  ArrowRight,
} from "lucide-react";
import IncludedCard from "./IncludedCard";
import { japanHutulburt } from "@/data/hutulbur/hutulburtBagtsan";
const Japan = () => {
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Нарита - Чиба муж",

      route: [
        { name: "Улаанбаатар ", distance: "2400 км", duration: "6 цаг" },
        { name: "Нарита", distance: " ", duration: "2 цаг" },
        { name: "Чиба" },
      ],
      description: [
        "Чингис хаан Олон улсын нисэх онгоцны буудал дээр өглөө 05:30 цагт цуглан үдэгчээс мэдээлэл авч аяллын бүртгэлээ хийлгэнэ.",
        "Онгоц 07:45 цагт Улаанбаатараас хөөрч Токио хотын Нарита нисэх онгоцны буудал дээр 13:40 цагт бууна.",
        "Хилээр нэвтэрч ачаагаа авсны дараа нутгийн хөтөчтэй уулзан автобусаар 2 цаг орчим яваад Чиба мужд байрладаг Номхон далайн эргийн халуун рашаантай зочид буудалд байрлан амарна. Оройн хоол зочид буудалдаа иднэ.  ",
      ],
      meals: { dinner: "Оройн хоол" },
      accommodation: "3 одтой буудал",
    },
    {
      day: 2,
      title: "Чиба - Яманаши муж",
      description: [
        "Аяллын 2 дах өдөр өглөөний цайгаа уусны дараа Чикура жимсний тайлбай орж намрын эхний ургацыг түүж иднэ.",
        "Үүний дараа Камогава далайн амьтдын хүрээлэн аквариум орно. Дараа нь Токио Бэй усан онгоцны аялал хийнэ.",
        "Японы канас боомтоос Хитосатохама боомт руу ойролцоогоор 40 минут аялна.",
        "Зочид буудалд очихоос өмнө Японы уламжлалт халуун рашаан спад орж алжаал ядаргаагаа тайлна.",
        "Орой Яманаши мужийн зочид буудалдаа байрлан амарна.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай", lunch: "Өдрийн хоол" },
      accommodation: "3 одтой буудал",
    },
    {
      day: 3,
      title: "Фүжи уул",
      description: [
        "Өглөөний цай уусны дараа аялагчид буудлын өрөөгөө хүлээлгэж өгөөд 09:30 цагт Кавагүчи нууранд очиж Фүжи уулыг холоос харна. 2014 онд Юнескогийн Дэлхийн соёлын өвд бүртгэгдсэн Фүжи уул нь Японы 108 галт уулын хамгийн өндөр нь бөгөөд далайн  түвшнээс  дээш  3776  метрт өргөгдсөн байна. ",
        "Өдрийн хоолны дараа Ширайто хүрхрээ үзнэ. Фүжи уулын ойролцоо байдаг байгалийн үзэсгэлэнт торгон хүрхрээ юм.",
        "Үүний дараа Готэнба аутлетийн дэлгүүрт очиж худалдаа хийнэ. Готэнба аутлетийн дэлгүүр нь Шизүока мужид байдаг ба 210 төрлийн дэлхийн болон Японы брэндийн дэлгүүр төвлөрсөн байдаг. ",
        "Орой 20:30 цагт зочид буудалдаа амарна.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай", lunch: "Өдрийн хоол" },
      accommodation: "3 одтой буудал",
    },
    {
      day: 4,
      title: "Токио хот",

      description: [
        "Өглөөний цайгаа уусны дараа буудалдаа амарч болно.",
        "Энэ өдөр унаа, хоол болон нийтийн тээврийн зардал ороогүй боловч хөтөч нийтийн тээврээр Одайба арал болон Харажюкү руу дагуулж явна. Оролцохгүй хүмүүс өөрсдийн дураар үлдэж болно. Мөн энэ өдрийн лааны тосон  музей  болон  гэрлийн  арт музейн тасалбарыг урьдчилан захиалуулж үзэх боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "3 одтой буудал",
    },
    {
      day: 5,
      title: "Токио хот - Нарита",
      description: [
        "Өглөөний цайгаа уусны дараагаар өрөөгөө хүлээлгэж өгнө. Энэ өдөр Буддын Сэнсожи сүм, Шинтогийн шашны Асакуса сүм болон бэлэг дурсгал, худалдааны гудамжтай танилцана.",
        "Түүний дараа дэлхийн хамгийн өндөр цамхаг Скай Три дээр гарч Токио хотыг 350 метрийн өндөр дээрээс харна.",
        "Үүний дараа Токио хотын Шибүяа дүүрэгт очиж үзнэ. Энд 16:30-20:00 цагийн хооронд эзэндээ үнэнч Хачико нохойны хөшөө болон дэлхийд алдартай хамгийн олон хүн зөрдөг замын уулзвар гарцыг харж, нийслэл хотын соёл, нийгэмтэй танилцана.",
        "Мөн худалдан авалт хийх боломжтой олон дэлгүүр мөн хоолны газар их байдаг ба оройн хоолоо энд идэж болно. Орой Наритагийн зочид буудалд байрлан амарна.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай", lunch: "Өдрийн хоол" },
      accommodation: "3 одтой буудал",
    },
    {
      day: 6,
      title: "Сүүлийн өдөр ",
      route: [
        { name: "Нарита", distance: "2400 км", duration: "5 цаг" },
        { name: "Улаанбаатар " },
      ],
      description: [
        "Өглөөний цайгаа уусны дараагаар өрөөгөө хүлээлгэж өгөөд Наритагийн ОУНОБ руу явна.",
        "Онгоц 14:40-д хөөрч, Улаанбаатарт 19:45 цагт газардана. Үүгээр аялал маань өндөрлөх болно.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "3 одтой буудал",
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

        {/* Хөтөлбөртэй аялалд багтсан зүйлс */}
        <IncludedCard arr={japanHutulburt} />
      </div>
    </div>
  );
};

export default Japan;
