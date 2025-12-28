import {
  Utensils,
  Soup,
  BedDouble,
  Coffee,
  Calendar,
  Info,
  ArrowRight,
} from "lucide-react";

const galleryImages = [
  "https://www.asiaodysseytravel.com/images/china-tours/group-tours/sanya-beaches-700-3.jpg",
  "https://studycli.org/wp-content/uploads/2021/06/Hainan-China-beach.jpg.webp",
  "https://cdn.theworldofchinese.com/media/images/Ocean-Breeze-and-Ease_inpost3.width-800.jpg",
  "https://blooloop.com/wp-content/uploads/2018/10/Atlantis-Sanya-Aquaventure-Sanya-43.jpeg",
  "https://upload.wikimedia.org/wikipedia/commons/3/3c/Glass_Trestle_with_Full_Sea_View_%28Yalong_Bay_Forest_Park_Glass_Bridge%29_in_July_2025.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/f8/bb/ed/phoenix-park.jpg?w=800&h=-1&s=1",
];

const hotelImages = [
  "https://media-cdn.tripadvisor.com/media/photo-s/2c/1f/f5/fe/overview-of-mandarin.jpg",
  "https://pix10.agoda.net/hotelImages/393984/0/ad0eaa78f83f17e07ceaca9788fc1007.jpg?ce=2&s=1024x768",
  "https://images.trvl-media.com/lodging/2000000/1460000/1453700/1453664/444a78f3.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
];

const Hainan = () => {
  // Keeping your original data structure
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Саняа",
      date: "2025.12.27 (Бямба)",
      cover_photo: "https://placehold.co/600x400/87CEEB/ffffff?text=Bangkok",
      location: "Улаанбаатар City",
      route: [
        { name: "Улаанбаатар ", distance: "3363 км", duration: "5 цаг" },
        { name: "Саняа" },
      ],
      description: [
        "  19:45 цагт “Чингис хаан” олон улсын нисэх онгоцны буудал дээр цугларч үдэгчээс мэдээлэл авна.",
        "20:10 цагт Бүртгэл эхлэхээр суудлаа бичүүлнэ.",
        "22:10 цагт УБ-Саняа хотруу (5-н цаг) Хүннү эйрлайн шууд нислэг /онгоц нь хоолтой/",
        "03:10 цагт Саняа хотын Финикс олон улсын нисэх онгоцны буудалд буугаад хөтөч тосож буудалдаа хүргүүлж амарна.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол: ресторан",
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
      title:
        "БҮТЭН ӨДРИЙН УБУД ХОТЫН АЯЛАЛ + KINTAMANI ГАЛТ УУЛЫН АЯЛАЛ/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.29 (Даваа)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",

      description: [
        "(Аяллын автобус)",
        "Товлосон цагт цугларч автобусандаа суун аварга загасны аж ахуйтай танилцана. 3-н давхар тансаг зэрэглэлийн усан онгоцоор Номхон далайд 3-н цаг аялна. Үүнд DJ, Karaoke, загасчлал, жимс, уух зүйлс, (хязгаартай) туршлагатай усан онгоцны баг зэрэг багтсан. Энэ аялалдаа та нэмэлтээр далайд шумбах, моторт завь, шүхэр, fly boarding зэрэг олон тоглоомууд тоглох боломжтой. (260-800 ЮАНЬ)",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай", dinner: "Оройн хоол" },
      accommodation: "",
    },
    {
      day: 4,
      title:
        "БҮТЭН ӨДРИЙН BEDUGUL ХЭСГИЙН АЯЛАЛ + TANAH LOT/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.30 (Мягмар)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      date: "2025.12.31 (Лхагва)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",

      description: [
        "Чөлөөт өдрүүдээр далайн эрэг орж цагийг өнгөрөөх, буудалдаа амрах, дэлгүүр хэсэх, нэмэлт сонирхолтой хөтөлбөр авах зэрэг бусад хүссэн зүйлсээ хийх боломжтой.",
      ],
      meals: { breakfast: "Зочид буудлын өглөөний цай" },
      accommodation: "",
    },
    {
      day: 6,
      title: "УСАН ПАРК ҮНЭГҮЙ",
      date: "2025.1.1 (Пүрэв)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",

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
      date: "2025.1.2 (Баасан)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",

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
      date: "2025.1.3 (Бямба)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",

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
      date: "2025.1.4 (Ням)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
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

export { galleryImages as hainanGallery, hotelImages as hainanHotel };
export default Hainan;
