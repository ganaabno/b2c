import {
  MapPin,
  Utensils,
  BedDouble,
  Coffee,
  Calendar,
  Info,
  ArrowRight,
} from "lucide-react";

const Natrang = () => {
  // Keeping your original data structure
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар - Ханой",
      date: "2025.12.27 (Бямба)",
      cover_photo: "https://placehold.co/600x400/87CEEB/ffffff?text=Bangkok",
      location: "Улаанбаатар City",
      route: [
        { name: "Улаанбаатар ", distance: "3822km", duration: "4 цаг" },
        { name: "Ханой" },
      ],
      description: [
        "05:00 Аялагчид Хөшигийн хөндийн “Чингис Хаан” олон улсын нисэх онгоцны буудалд ирсэн байна.",
        "08:00 – 12:00 Улаанбаатар – Ханой нислэг",
        "14:00 Ханой хотын зочид буудалд байрлана",
        "Аялагчид нийтдээ 2 өдөр 2 шөнө Вьетнам улсын Ханой хотод байрлан амарна.",
      ],
      meals: { lunch: "Restaurant" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 2,
      title: "Pattaya Tour",
      date: "2025.12.28 (Ням)",
      cover_photo: "https://placehold.co/600x400/8B4513/ffffff?text=Pattaya",
      location: "Pattaya City",
      description: [
        "06:00-07:00 Өглөөний цай",
        "07:30 цагт Зочид буудлын өрөөг хүлээлгэж өгөн Ной Бай олон улсын нисэх буудал руу хөдөлнө",
        "10:05-16:25 Ханой-Бали нислэг",
        "18:00-18:30 Зочид буудалд байрлана",
        "Аялагчид нийтдээ 5 өдөр 5 шөнө Индонез улсын Бали аралд байрлан амарна.",
      ],
      meals: { breakfast: "Hotel breakfast", lunch: "Restaurant" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 3,
      title:
        "БҮТЭН ӨДРИЙН УБУД ХОТЫН АЯЛАЛ + KINTAMANI ГАЛТ УУЛЫН АЯЛАЛ/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.29 (Даваа)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
      location: "Pattaya City",
      route: [{ name: "Pattaya City", distance: "15km", duration: "30min" }],
      description: [
        "08:00 Өглөөний цай",
        "Ubud Palace – Түүхэн дурсгалт хааны ордон",
        "Uma Pakel Swing дүүжин – Нутгийн кофег амтлан шувууны үүрэнд зураг даруулах боломжтой",
        "Tampak Siring хот – Tirta Empul ариун усны сүм",
        "Tegalalang тосгон – Будааны дэнж",
        "Batur галт уул болон Batur нуур",
      ],
      meals: { lunch: "Restaurant", dinner: "Included" },
      accommodation: "Jomtien Palm Beach Hotel",
    },
    {
      day: 4,
      title:
        "БҮТЭН ӨДРИЙН BEDUGUL ХЭСГИЙН АЯЛАЛ + TANAH LOT/ӨДӨР & ОРОЙН ХООЛ/",
      date: "2025.12.30 (Мягмар)",
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
      cover_photo: "https://placehold.co/600x400/00CED1/ffffff?text=Island",
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
            Natrang tour itinerary
          </h1>
        </div>

        <div className="space-y-6">
          {tourData.map((tour) => (
            <div
              key={tour.day}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md">
              {/* Left: cover_photo Section */}
              <div className="md:w-56 h-56 md:h-auto bg-gray-100 dark:bg-gray-700 shrink-0 relative group">
                <img
                  src={tour.cover_photo}
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

export default Natrang;
