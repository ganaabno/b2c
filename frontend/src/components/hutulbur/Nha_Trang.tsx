import {
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  ArrowRight,
  Soup,
} from "lucide-react";
import IncludedCard from "./IncludedCard";
import { nhatrangHutulburt } from "@/data/hutulbur/hutulburtBagtsan";
const galleryImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767002098/NhaTrang_s9fuqy.png",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076145/NhaTrang5_qr15ui.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076138/NhaTrang2_f4oxg2.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076142/NhaTRang1_cqjofe.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076139/NhaTrang3_uzlcxv.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767076052/NhaTrang4_rhbpqq.jpg",
];

const hotelImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990424/ad0eaa78f83f17e07ceaca9788fc1007_wuxidg.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
];

const Nha_Trang = () => {
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Натранг",

      route: [
        { name: "Улаанбаатар ", distance: "3800 км", duration: "4 цаг 40 мин" },
        { name: "Натранг" },
      ],
      description: [
        "05:00 Аялагчид Хөшигийн хөндийн “Чингис Хаан” олон улсын нисэх онгоцны буудалд ирсэн байна.",
        "08:00 – 12:40 Улаанбаатар – Натранг нислэг",
        "13:40 Онгоцны буудлаас нэгдсэн байдлаар автобусанд суун зочид буудалруу очиж байрлана /Regalia Gold Hotel/",
      ],
      meals: {},
      accommodation: "5 одтой зочид буудал",
    },
    {
      day: 2,
      title: "Ponagar Cham Towers, Mud Bath",

      description: [
        "Beauty Bay – үзэсгэлэнт далайн эрэг дээр амарна.",
        "Ponagar Cham Towers – Понагар Чам Цамхаг нь Натранг хотод үзэх хамгийн сонирхолтой газруудын нэг юм. Вьетнамын гайхамшигт архитектурыг харахаас гадна нутгийн түүхийн талаар илүү ихийг мэдэх боломжтой. Fruit Buffet – Вьетнам улсын олон төрлийн баялаг жимсийг амтална.",
        "Mud Bath буюу шаварт орох. Шаварт орох нь стресс, үе мөчний өвчин болон арьсны зарим өвчнийг намдааж өгдөг гэж үздэг. Зарим хүмүүс шаварт орж алжаалаа тайлж, амраахын тулд хэрэглэдэг.",
        "*Далай руу харсан шавар ванн болгож сайжруулж болно.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "5 одтой зочид буудал",
    },
    {
      day: 3,
      title: "Jade shop, Speed boat to ocean, 3 төрлийн арал",

      description: [
        "Jade Shop – Хаш чулууны дэлгүүрээр орно. Гар хийцээр хийсэн үнэт чимэглэлийг худалдан авах боломжтой.",
        "Speed boat to ocean – Хурдны завиар далайгаар аялна. 3 төрлийн арлаар зочилно.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "5 одтой зочид буудал",
    },
    {
      day: 4,
      title: "4th day, 4 destinations",

      description: [
        "Treasure Museum – Натранг хотын үнэт эдлэлийн музей үзэх.",
        "Hon Chong Promontory – Онгон байгалийн хадан чулуунуудын өвөрмөц, чамин төрх, нууцлаг төрхтэй танилцана.",
        "Vietnamese Drip Coffee – Вьетнам улсын кофег хэрхэн дэлхийд алдартай болсон тухайг судалж мэдэн нутгийн кофег амтална.",
        "Bac Thanh Church – Натранг хотын үзэсгэлэнт католик сүмээр зочилно.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "5 одтой зочид буудал",
    },
    {
      day: 5,
      title: "Чөлөөт өдөр",

      description: [
        "Vietnamese Spa – Вьетнам улсын уламжлалт массаж хийлгэж алжаалаа тайлах боломж олдоно. /нэмэлт төлбөртэй /",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "5 одтой зочид буудал",
    },
    {
      day: 6,
      title: "Чөлөөт өдөр",

      description: [
        "Хоёр чөлөөт өдрөөр та өөрийн төлөвлөсөн, хийхийг хүссэн зүйлсийг хийх боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "",
        dinner: "",
      },
      accommodation: "5 одтой зочид буудал",
    },
    {
      day: 7,
      title: "Натранг - Улаанбаатар",
      route: [
        { name: "Натранг", distance: "3800 км", duration: "7 цаг" },
        { name: "Улаанбаатар " },
      ],
      description: [
        "21:00 Аялагчид зочид буудлын өрөөг хүлээлгэж өгнө",
        "21:30 Зочид буудлаас онгоцны буудал руу хүргэж өгнө",
        "00:05 – 07:00 Натранг – Улаанбаатар нислэг",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "5 одтой зочид буудал",
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

        {/* Summary Footer */}
        <IncludedCard arr={nhatrangHutulburt} />
      </div>
    </div>
  );
};

export { galleryImages as nhatrangImages, hotelImages as nhatrangHotel };
export default Nha_Trang;
