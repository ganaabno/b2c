import {
  Soup,
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  Info,
  ArrowRight,
} from "lucide-react";

const galleryImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767002037/Singapore_fhvxca.png",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767073882/Singapore2_dk4tup.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767073878/Singapore5_ya9o9o.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767073883/Singapore1_wytage.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767073902/Singapore3_mwwx6b.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1767073907/Singapore4_woi8o2.jpg",
];

const hotelImages = [
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990424/ad0eaa78f83f17e07ceaca9788fc1007_wuxidg.jpg",
  "https://res.cloudinary.com/di9bplyfy/image/upload/v1766990434/444a78f3_as3vfb.jpg",
];

const Singapore = () => {
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Сингапур",
      date: "2025.12.27 (Бямба)",
      cover_photo: "https://placehold.co/600x400/87CEEB/ffffff?text=Bangkok",
      location: "Улаанбаатар ",
      route: [
        { name: "Улаанбаатар ", distance: "5158 км", duration: "7 цаг 30 мин" },
        { name: "Сингапур" },
      ],
      description: [
        "Өглөөний 06:30 цагт  Хөшигийн хөндийн “Чингис Хаан” олон улсын нисэх онгоцны буудалд цуглаж, үдэгчээс мэдээлэл авч бүртгэлээ хийлгэнэ. ",
        "Улаанбаатар хотоос 09:30 цагт хөөрөөд Сингапур улсын ЧАНГИ олон улсын нисэх онгоцны буудалд 16:55 цагт буух ба  Зочид буудал руу хүргүүлж оройн хоолоо идээд амарна.",
      ],
      meals: { dinner: "Оройн хоол: Зочид буудал" },
      accommodation: "Hotel traveltine",
    },
    {
      day: 2,
      title: "Сингапур хотын аялал",
      date: "2025.12.28 (Ням)",
      cover_photo: "https://placehold.co/600x400/8B4513/ffffff?text=Pattaya",
      location: "Сингапур",
      description: [
        "Өглөөний цайгаа уугаад алдарт Марина Бэй Сэндс зочид буудлыг харж, Мерлион цэцэрлэгт хүрээлэнгээр зугаална. ",
        "Өдрийн хоолны дараа Үүлэн ой ба Цэцгийн хүлэмжээр аялаад, Orchard Road-д худалдаа хийж болно.",
        "Нэмэлтээр та бүхэн Сингапур хотын үдшийн криуз аялал хийж болно (нэмэлт төлбөртэй)",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "Hotel traveltine",
    },
    {
      day: 3,
      title: "Индонез - Бинтан арал",
      date: "2025.12.29 (Даваа)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Сингапур - Бинтан",

      description: [
        "Энэ өдөр бид буудлаа хүлээлгэж өгөөд усан онгоцоор Инденоз улсын аялал жуулчлалын бүс болох Бинтан арал руу 1 цаг явна.",
        "Хил гаалиар нэвтэрсний дараа далайн эрэгт байрлах буудалдаа хүргүүлж амрана.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "Hotel traveltine",
    },
    {
      day: 4,
      title: "Чөлөөт өдөр",
      date: "2025.12.30 (Мягмар)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Бинтан арал",

      description: [
        "Яанода ойн паркийн аялал. (нэмэлт төлбөртэй: шилэн гүүр (98yuan), 12 төрлийн экстрэм тоглоомууд болон уулнаас завьтай гулгаж буух боломжтой (198 yuan). Хятадын цайны соёлтой танилцаж Кунг Фу цай амтлана.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
        dinner: "Оройн хоол",
      },
      accommodation: "Angsana Bintan *****",
    },
    {
      day: 5,
      title: "Усан бассейн",
      date: "2025.12.31 (Лхагва)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Бинтан",

      description: [
        "Өглөөний цайны дараа Азийн хамгийн том усан бассейнд өдрийг өнгөрүүлнэ. /урт 150метр өргөн 800метр/",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "Angsana Bintan *****",
    },
    {
      day: 6,
      title: "Чөлөөт өдөр",
      date: "2025.1.1 (Пүрэв)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Бинтан",

      description: [
        "Чөлөөт өдрөөр та далайн эрэг дээр амрах, хүсвэл нэмэлтээр хөтөлбөр авах боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
      accommodation: "Angsana Bintan *****",
    },
    {
      day: 7,
      title: "Сингапур - Сентоза",
      date: "2025.1.2 (Баасан)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Сентоза",

      description: [
        "Өглөөний цайны дараа буудлаа хүлээлгэж өгөөд усан онгоцоор Сингапурт ирээд Сентоза арлаар цагийг зугаатай өнгөрүүлэх боломжтой ба шоппинг хийж орой нь алдарт Wings of Time шоу үзнэ.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
      accommodation: "Hotel traveltine",
    },

    {
      day: 8,
      title: "Сингапур - Улаанбаатар",
      date: "2025.1.4 (Ням)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [
        { name: "Сингапур", distance: "5158 км", duration: "7 цаг 30 мин" },
        { name: "Улаанбаатар" },
      ],
      description: [
        "Өглөөний цайны дараа чөлөөтэй бөгөөд та бүгд ойролцоох дэлгүүр, худалдааны төвөөр явах боломжтой.",
        "Орой 19:25 цагт Сингапур- Монгол руу буцах ба 02.55 (+1) цагт газардаж бидний дурсамж дүүрэн аялал өндөрлөнө.",
      ],
      meals: {
        breakfast: "Өглөөний цай",
      },
      accommodation: "",
    },
  ];

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 p-4 md:p-8 font-sans">
      <div className=" ">
        {/* Header Section */}
        <div className="space-y-6">
          {tourData.map((tour) => (
            <div
              key={tour.day}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md"
            >
              {/*Content Section */}
              <div className="px-6 py-4 flex-1 flex flex-col">
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
                      className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex gap-3 items-start"
                    >
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
                          title="Breakfast"
                        >
                          <Coffee className="h-4 w-4 text-amber-600" />
                          <span>{tour.meals.breakfast}</span>
                        </div>
                      )}
                      {tour.meals.lunch && (
                        <div
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          title="Lunch"
                        >
                          <Utensils className="h-4 w-4 text-amber-600" />
                          <span>{tour.meals.lunch}</span>
                        </div>
                      )}
                      {tour.meals.dinner && (
                        <div
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                          title="Dinner"
                        >
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
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export { galleryImages as singaporeImages, hotelImages as singaporeHotel };
export default Singapore;
