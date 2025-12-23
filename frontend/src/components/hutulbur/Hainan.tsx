import {
  MapPin,
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  Info,
  ArrowRight,
} from "lucide-react";

const Hainan = () => {
  // Keeping your original data structure
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Саняа",
      date: "2025.12.27 (Бямба)",
      image: "https://placehold.co/600x400/87CEEB/ffffff?text=Bangkok",
      location: "Улаанбаатар City",
      route: [
        { name: "Улаанбаатар ", distance: "3822km", duration: "4 цаг" },
        { name: "Ханой" },
      ],
      description: [
        "  19:45 цагт “Чингис хаан” олон улсын нисэх онгоцны буудал дээр цугларч үдэгчээс мэдээлэл авна.",
        "20:10 цагт Бүртгэл эхлэхээр суудлаа бичүүлнэ.",
        "22:10 цагт УБ-Саняа хотруу (5-н цаг) Хүннү эйрлайн шууд нислэг /онгоц нь хоолтой/",
        "03:10 цагт Саняа хотын Финикс олон улсын нисэх онгоцны буудалд буугаад хөтөч тосож буудалдаа хүргүүлж амарна.",
      ],
      meals: { lunch: "Restaurant" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 2,
      title: "Чөлөөт өдөр",
      date: "2025.12.28 (Ням)",
      image: "https://placehold.co/600x400/8B4513/ffffff?text=Pattaya",
      location: "Pattaya City",
      description: [
        "Чөлөөт өдрүүдээр далайн эрэг орж цагийг өнгөрөөх, буудалдаа амрах, дэлгүүр хэсэх, нэмэлт сонирхолтой хөтөлбөр авах зэрэг бусад хүссэн зүйлсээ хийх боломжтой.",
      ],
      meals: { breakfast: "Hotel breakfast" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 3,
      title:
        "БҮТЭН ӨДРИЙН УБУД ХОТЫН АЯЛАЛ + KINTAMANI ГАЛТ УУЛЫН АЯЛАЛ/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.29 (Даваа)",
      image: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "(Аяллын автобус)",
        "Товлосон цагт цугларч автобусандаа суун аварга загасны аж ахуйтай танилцана. 3-н давхар тансаг зэрэглэлийн усан онгоцоор Номхон далайд 3-н цаг аялна. Үүнд DJ, Karaoke, загасчлал, жимс, уух зүйлс, (хязгаартай) туршлагатай усан онгоцны баг зэрэг багтсан. Энэ аялалдаа та нэмэлтээр далайд шумбах, моторт завь, шүхэр, fly boarding зэрэг олон тоглоомууд тоглох боломжтой. (260-800 ЮАНЬ)",
      ],
      meals: { breakfast: "Restaurant", dinner: "Included" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 4,
      title:
        "БҮТЭН ӨДРИЙН BEDUGUL ХЭСГИЙН АЯЛАЛ + TANAH LOT/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.30 (Мягмар)",
      image: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      image: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      image: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      image: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      image: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-500">
            <MapPin className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Hainan tour itinerary
          </h1>
        </div>

        <div className="space-y-6">
          {tourData.map((tour) => (
            <div
              key={tour.day}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
              {/* Left: Image Section */}
              <div className="md:w-56 h-56 md:h-auto bg-gray-100 dark:bg-gray-700 shrink-0 relative group">
                <img
                  src={tour.image}
                  alt={`Day ${tour.day}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs font-bold px-3 py-1 rounded shadow-lg">
                  Day {tour.day}
                </div>
              </div>

              {/* Right: Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                {/* Card Header */}
                <div className="mb-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <h2 className="text-xl font-bold text-amber-700 dark:text-amber-500">
                      {tour.title}
                    </h2>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full w-fit">
                      <Calendar className="h-3.5 w-3.5 mr-2" />
                      {tour.date}
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
      </div>
    </div>
  );
};

export default Hainan;
