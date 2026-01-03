import {
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  
  ArrowRight,
  Soup
} from "lucide-react";
import IncludedCard from "./IncludedCard";
import { phuquocHutulburt } from "@/data/hutulbur/hutulburtBagtsan";

const galleryImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767001917/PhuQuoc_rrqws9.png",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767074832/PhuQuoc5_x6qqpl.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767074833/PhuQuoc1_gjnfxq.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767074832/PhuQuoc3_i1edxp.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767074832/PhuQuoc2_c9snko.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767074834/PhuQuoc4_netmwe.jpg",
];

const hotelImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990424/ad0eaa78f83f17e07ceaca9788fc1007_wuxidg.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
];

const Phu_Quoc = () => {
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Фукуок",

      route: [
        { name: "Улаанбаатар ", distance: "4000 км", duration: "6 цаг 30 мин" },
        { name: "Фукуок" },
      ],
      description: [
        "06:00 Аялагчид Хөшигийн хөндийн “Чингис Хаан” олон улсын нисэх онгоцны буудалд ирсэн байна.",
        "15:00 – 21:30 Улаанбаатар – Фукуок нислэг",
        "22:30 Зочид буудалд байрлах",
      ],
      meals: {},
      accommodation: "",
    },
    {
      day: "2-6",
      title: "Фукуок",

      description: [
        "Аялагчид нийтдээ 7 өдөр 6 шөнө эсвэл 14 өдөр 13 шөнө Вьетнам улсын Фукуок арлын ресортод байрлан, манай компаний зүгээс санал болгож буй хөтөлбөрүүдээс сонгон аялах боломжтой.",
        ` КАЗИНО: 
        Та Фукуокд байрлах CORONA Казинод өөрийн хүссэн /автомат тоглоом, ширээний покер, рулет, баккарат гэх мэт/ тоглоомуудаас сонгон тоглож цагийг зугаатай өнгөрөөх боломжтой.`,
        `GRAND WORLD:
Гранд Ворлд Фукуок нь Phu Quoc United Center-ийн нэг хэсэг болох үзвэр үйлчилгээ, худалдааны томоохон цогцолбор бөгөөд Фукуок арлын алдартай аялал жуулчлалын бүс болох Гань Дау коммуны Бай Дай орчимд байрладаг.
Хэдий энэ цогцолбор 2020 оны сүүлчээр ашиглалтад орсон ч маш хурдан хугацаанд Фукуокын “сувдан арал”-д ирсэн аялагч бүрийн заавал очих ёстой газруудын нэг болж чаджээ.
85 га газрыг хамарсан Гранд Ворлд нь Европын сонгодог хотуудын архитектурын урам зоригийг шингээсэн гайхамшигтай хийцтэй.`,
        `VINWONDERS AND SAFARI:
Энэхүү парк нь зүүн өмнөд Азийн хамгийн том цогцолбор парк бөгөөд дотроо зургаан дэд хэсэгт хуваагддаг 100 гаруй нэр төрлийн интерактив үйл ажиллаагааг явуулдаг:
Аварга том далайн амьтдын аквариум үзэх
Усны парк дээр хөгжилдөх
20 гаруй нэр төрлийн дэлхий дээрх хамгийн адал явдалтай паркийн тоглоомд орж тоглох боломжтой
VINPEARL SAFARI амьтны хүрээлэнд амьтдын үзүүлбэр үзэх, хамгийн өвөрмөц амьтдыг зургаа татуулж, зарим амьтадд дээр нь очиж үзэх, хооллох боломжтой.
Тусгайлагдсан арслан, тахийн сүрэг, Энэтхэгийн заан зэрэг олон төрөл Бингалийн бар зэрэг үзмэрээс ховор амьтны хүрээлэнд байдаг хамгийн ховор амьтдыг үзэх боломжтой.`,
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "",
    },

    {
      day: 7,
      title: "Сүүлийн өдөр",
      route: [
        { name: "Фукуок", distance: "4000 км", duration: "8 цаг " },
        { name: "Улаанбаатар " },
      ],
      description: [
        "07:00-09:00 Өглөөний цай",
        "18:45 Зочид буудлаас нисэх буудал руу хөдөлнө.",
        `20:00 цагт аялагчид Фукуок арлын олон улсын нисэх онгоцны буудалд ирсэн байна`,
        "22:40 – 06:30 Фукуок – Улаанбаатар нислэг",
        "АНХААР! Дээрх нислэгийн цагийн хуваарьт өөрчлөлт орж болзошгүй.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        dinner: "",
        lunch: "",
      },
      accommodation: "",
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

          <IncludedCard  arr={phuquocHutulburt}/>
        </div>
   
    </div>
  );
};

export { galleryImages as phuquocImages, hotelImages as phuquocHotel };
export default Phu_Quoc;
