import { useState, useEffect } from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Бат-Эрдэнэ",
    rating: 5,
    comment:
      "Маш гоё аялал байлаа! Байгалийн үзэсгэлэн, зохион байгуулалт – бүгд төгс. Дахин явахыг хүсч байна!",
  },
  {
    id: 2,
    name: "Сувд-Эрдэнэ",
    rating: 5,
    comment:
      "Хөтөч нар маш мэдлэгтэй, найрсаг байсан. Хоол унд, буудал – бүгд өндөр түвшинд. Баярлалаа!",
  },
  {
    id: 3,
    name: "Оюунтүлхүүр",
    rating: 4,
    comment:
      "Гэр бүлээрээ явсан, хүүхдүүдэд маш их таалагдсан. Зөвхөн нэг л өдөр бороо орсон нь жаахан саад болсон ч ерөнхийдөө гайхалтай!",
  },
  {
    id: 4,
    name: "Тэмүүлэн",
    rating: 5,
    comment:
      "Хайнан арлын аялал – амьдралдаа хийсэн хамгийн сайхан шийдвэрүүдийн нэг байлаа. Зөвлөж байна!",
  },
  {
    id: 5,
    name: "Энхжин",
    rating: 5,
    comment:
      "Зураг авахуулах газар бүрт зогсоод, тайлбарлаж өгдөг нь онцгой байсан. Маш их баярлалаа!",
  },
  {
    id: 6,
    name: "Амарсанаа",
    rating: 5,
    comment:
      "Бүх зүйл төлөвлөгөө ёсоор явагдсан. Аюулгүй байдал, тав тух – бүгд анхаарч ажилласан нь мэдрэгдэж байсан.",
  },
  {
    id: 7,
    name: "Ганзориг",
    rating: 4,
    comment:
      "Аяллын маршрут маш сайн боловсруулагдсан. Зөвхөн нэг зочид буудлын өрөө жаахан жижиг байсан ч ерөнхийдөө сэтгэл хангалуун байна.",
  },
  {
    id: 8,
    name: "Наранцэцэг",
    rating: 5,
    comment:
      "Найзуудтайгаа явсан, бүгдэд таалагдсан! Дараагийн аялалд заавал дахиж бүртгүүлнэ шүү!",
  },
  {
    id: 9,
    name: "Болдбаатар",
    rating: 5,
    comment:
      "Маш адреналинтай, сонирхолтой аялал байлаа. Мартагдахааргүй сайхан аялал болсон!",
  },
];

const CARDS_PER_SLIDE = 3;
const TOTAL_SLIDES = Math.ceil(testimonials.length / CARDS_PER_SLIDE);

export default function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-8 bg dark:bg-gray-800">
      <div className="mx-auto max-w-[2000px]">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-16">
          Зорчигчдын Сэтгэгдэл
        </h2>

        <div className="overflow-hidden rounded-3xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/50">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* Slide 1: Comments 1-3 */}
            <div className="shrink-0 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 md:p-12">
                {testimonials.slice(0, 3).map((t) => (
                  <TestimonialCard key={t.id} {...t} />
                ))}
              </div>
            </div>

            {/* Slide 2: Comments 4-6 */}
            <div className="shrink-0 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 md:p-12">
                {testimonials.slice(3, 6).map((t) => (
                  <TestimonialCard key={t.id} {...t} />
                ))}
              </div>
            </div>

            {/* Slide 3: Comments 7-9 */}
            <div className="shrink-0 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 md:p-12">
                {testimonials.slice(6, 9).map((t) => (
                  <TestimonialCard key={t.id} {...t} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {[...Array(TOTAL_SLIDES)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 w-3 md:h-4 md:w-4 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? "bg-amber-500 scale-125 shadow-lg"
                  : "bg-gray-400 dark:bg-gray-600 hover:bg-amber-400"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Clean card component
function TestimonialCard({
  name,
  rating,
  comment,
}: {
  name: string;
  rating: number;
  comment: string;
}) {
  return (
    <div className="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/50 dark:border-gray-700/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-full flex flex-col justify-between">
      <div>
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 md:h-6 md:w-6 transition-colors ${
                i < rating
                  ? "fill-amber-500 text-amber-500"
                  : "text-gray-300 dark:text-gray-600 group-hover:text-amber-400"
              }`}
            />
          ))}
        </div>

        {/* Comment */}
        <blockquote className="text-center text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-200 italic font-light mb-8">
          "{comment}"
        </blockquote>
      </div>

      {/* Author */}
      <div className="text-center">
        <p className="text-lg font-semibold text-amber-600 dark:text-amber-400 group-hover:text-amber-500 transition-colors">
          — {name}
        </p>
      </div>
    </div>
  );
}
