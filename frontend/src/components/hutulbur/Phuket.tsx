import { Utensils, Soup, Coffee, Calendar, Info } from "lucide-react";

const galleryImages = [
  "https://global-travel.mn/wp-content/uploads/2025/12/%D0%97%D0%90%D0%A1%D0%A1%D0%90%D0%9D-%D0%9F%D0%A3%D0%9A%D0%95%D0%A2-%D0%90%D0%AF%D0%9B%D0%90%D0%9B.png",
  "https://voyagesautenteo.com/wp-content/uploads/2022/10/freedom-beach.jpg",
  "https://imgs.search.brave.com/H66-FrJ7h5cMsz4AA7Ez8GyFIUPCxeAHCqd-_FeVGLc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ub3J0/aGFicm9hZC5jb20v/d3AtY29udGVudC91/cGxvYWRzL3BodWtl/dC10aGFpbGFuZC1E/SklfMDMzNC5qcGc",
  "https://voyagesautenteo.com/wp-content/uploads/2022/10/banana-beach.jpg",
  "https://imgs.search.brave.com/KwJmEerb8l9JSv6vihrOIXKsJbxFLPV__83VbQPHNeM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oYmxp/bWcubW10Y2RuLmNv/bS9jb250ZW50L2h1/YmJsZS9pbWcvZGVz/dHR2aW1nL21tdC9k/ZXN0aW5hdGlvbi9t/X1BodWtldF90dl9k/ZXN0aW5hdGlvbl9p/bWdfNF9sXzg1MF8x/Mjc2LmpwZw",
  "https://imgs.search.brave.com/HJZCDak5fsOjK6hSawAXa9CyEKlSoRZqGo-xpSWejRU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oYmxp/bWcubW10Y2RuLmNv/bS9jb250ZW50L2h1/YmJsZS9pbWcvZGVz/dHR2aW1nL21tdC9k/ZXN0aW5hdGlvbi9t/X1BodWtldF90dl9k/ZXN0aW5hdGlvbl9p/bWdfM19sXzY4OV8x/MTAyLmpwZw",
];

const hotelImages = [
  "https://reserving.com/hotels/asia/thailand/phuket/patong-beach/the-nature-phuket",
  "https://pix10.agoda.net/hotelImages/665/66535/66535_15090414070035721416.jpg",
  "https://images.trvl-media.com/lodging/2000000/1640000/1637800/1637723/9f5dc7a3.jpg",
];

const Phuket = () => {
  const tourData = [
    {
      day: 1,
      title: "Улаанбаатар – Пхукет",
      date: "2025.12.20 (Бямба)",
      route: [
        { name: "Улаанбаатар", distance: "4,300 км", duration: "6 цаг" },
        { name: "Пхукет" },
      ],
      description: [
        "Чингис хаан олон улсын нисэх онгоцны буудал дээр цугларч бүртгэл хийнэ.",
        "Улаанбаатар – Пхукет чиглэлд шууд нислэгээр ниснэ.",
        "Пхукет олон улсын нисэх онгоцны буудалд газардаж хөтөч тосон авч зочид буудалд хүргэнэ.",
        "Буудалдаа байрлаад амарна.",
      ],
      meals: {
        dinner: "Оройн хоол",
      },
    },
    {
      day: 2,
      title: "Чөлөөт өдөр – Далайн эрэг",
      date: "2025.12.21 (Ням)",
      description: [
        "Патонг, Ката, Карон далайн эргээр чөлөөтэй амарна.",
        "Далайн усанд сэлэх, наран шарлага, SPA, массаж хийлгэх боломжтой.",
        "Орой нь Патонг гудамжаар зугаална.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
    },
    {
      day: 3,
      title: "Phi Phi арлын бүтэн өдрийн аялал",
      date: "2025.12.22 (Даваа)",
      description: [
        "Хурдан завиар Phi Phi арлууд руу аялна.",
        "Maya Bay, Monkey Beach, Viking Cave үзнэ.",
        "Далайн усанд шумбах, зураг авах боломжтой.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
    },
    {
      day: 4,
      title: "Phuket хотын аялал",
      date: "2025.12.23 (Мягмар)",
      description: [
        "Big Buddha хөшөө үзнэ.",
        "Phuket Old Town – хуучин хотын аялал.",
        "Cashew nut factory болон сувдны дэлгүүр орно.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
    },
    {
      day: 5,
      title: "James Bond Island",
      date: "2025.12.24 (Лхагва)",
      description: [
        "Phang Nga булангаар завиар аялна.",
        "James Bond Island дээр зураг авна.",
        "Каноэ завиар агуйгаар аялна.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
        lunch: "Өдрийн хоол",
      },
    },
    {
      day: 6,
      title: "Чөлөөт өдөр",
      date: "2025.12.25 (Пүрэв)",
      description: [
        "Чөлөөт өдөр – shopping, spa, далайн эрэг.",
        "Нэмэлт аялал авах боломжтой (elephant trekking, ATV гэх мэт).",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
    },
    {
      day: 7,
      title: "Пхукет – Улаанбаатар",
      date: "2025.12.26 (Баасан)",
      route: [
        { name: "Пхукет", distance: "4,300 км", duration: "6 цаг" },
        { name: "Улаанбаатар" },
      ],
      description: [
        "Буудлаа хүлээлгэн өгнө.",
        "Пхукет олон улсын нисэх онгоцны буудал руу явна.",
        "Улаанбаатар хотод газардаж аялал өндөрлөнө.",
      ],
      meals: {
        breakfast: "Зочид буудлын өглөөний цай",
      },
    },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="space-y-6">
        {tourData.map((tour) => (
          <div
            key={tour.day}
            className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-700">{tour.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                Өдөр {tour.day}
              </div>
            </div>

            {tour.route && (
              <div className="mb-4 border-l-2 border-dashed border-amber-400 pl-4 space-y-2">
                {tour.route.map((r, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                    <span className="font-medium">{r.name}</span>
                    {r.distance && (
                      <span className="text-xs text-gray-500">
                        {r.distance} · {r.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 mb-4">
              {tour.description.map((d, i) => (
                <p key={i} className="text-sm text-gray-600 dark:text-gray-300">
                  • {d}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t">
              {tour.meals?.breakfast && (
                <div className="flex items-center gap-2 text-sm">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  {tour.meals.breakfast}
                </div>
              )}
              {tour.meals?.lunch && (
                <div className="flex items-center gap-2 text-sm">
                  <Utensils className="w-4 h-4 text-amber-600" />
                  {tour.meals.lunch}
                </div>
              )}
              {tour.meals?.dinner && (
                <div className="flex items-center gap-2 text-sm">
                  <Soup className="w-4 h-4 text-amber-600" />
                  {tour.meals.dinner}
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Info className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-lg">Phuket Tour Highlights</h3>
          </div>
          <ul className="grid md:grid-cols-2 gap-2 text-sm">
            {[
              "Улаанбаатар – Пхукет шууд нислэг",
              "4-5 одтой далайн эргийн зочид буудал",
              "Phi Phi & James Bond Island",
              "Хотын аялал + чөлөөт өдрүүд",
              "Мэргэжлийн хөтөч",
            ].map((item, i) => (
              <li key={i}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { galleryImages as phuketGallery, hotelImages as phuketHotel };
export default Phuket;
