const carouselImages = [
  "https://www.toursmongolia.com/uploads/Amazing_landscape_naiman_lake_bayar.jpg",
  "https://www.discovermongolia.mn/uploads/1-Altai-5-bogd-top-10-places-bayar.JPG",
  "https://lp-cms-production.imgix.net/2023-08/GettyImages-683712525.jpg?w=600&h=400",
  "https://media.cnn.com/api/v1/images/stellar/prod/150907165607-beautiful-mongolia3-great-white-lake1.jpg",
  "https://www.discovermongolia.mn/uploads/2-Kharkhiraa-turgen-top-10-places-bayar-2.jpg",
  "https://resources.travellocal.com/wp/uploads/2023/09/10141335/Mongolia-sunset-ss-scaled.jpg",
  "https://www.toursmongolia.com/uploads/Amazing_landscape_photography.jpg",
  "https://media.cnn.com/api/v1/images/stellar/prod/150907165252-beautiful-mongolia-1-gobi-desert-v1.jpg",
];

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat h-96 md:h-[520px] flex items-center justify-center rounded-b-3xl"
        style={{
          backgroundImage:
            "url('https://www.kamzangjourneys.com/wp-content/uploads/2021/05/Mongolia-Sunset-Lake-Sand-Dunes-photo.jpg')",
        }}
      >
        {/* Тёмный оверлей + лёгкий градиент */}
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-black/60"></div>

        <div className="relative container mx-auto px-6 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white font-serif drop-shadow-2xl leading-tight">
            Илүү аял — илүү урамшуулал ав!
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/95 font-light drop-shadow-md max-w-3xl mx-auto">
            Илүү их аялвал илүү их шагнал урамшуулал хүлээж байна
          </p>

          {/* Небольшая кнопка CTA — не обязалово, но добавляет огонька */}
          <button className="mt-8 px-8 py-3 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
            Эхэлцгээе 🚀
          </button>
        </div>
      </div>

      {/* Endless Looping Carousel - Simple & Minimal */}
      <div className="py-12 bg-white overflow-hidden">
        <div className="relative">
          <div className="flex animate-carousel gap-6">
            {[...carouselImages, ...carouselImages].map((src, i) => (
              <div
                key={i}
                className="shrink-0 w-80 h-48 rounded-xl overflow-hidden shadow-lg"
              >
                <img
                  src={src}
                  alt="Mongolia tour"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Membership Tiers Visual */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Гишүүнчлэлийн зэрэглэл
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {["Bronze", "Silver", "Gold", "Platinum", "Diamond"].map(
            (tier, idx) => (
              <div key={tier} className="text-center">
                <div
                  className={`h-32 w-32 mx-auto rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl
                ${
                  idx === 0
                    ? "bg-bronze-linear bg-amber-900"
                    : idx === 1
                    ? "bg-silver-linear bg-slate-300"
                    : idx === 2
                    ? "bg-yellow-500"
                    : idx === 3
                    ? "bg-gray-400"
                    : "bg-linear-to-br from-purple-600 to-pink-600"
                }`}
                >
                  {tier}
                </div>
                <p className="mt-4 text-lg font-medium">
                  {idx * 2 + (idx > 0 ? 1 : 0)} аялал худалдаж авсан
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Benefits Table */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Давуу талуудын харьцуулалт
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-linear-to-r from-sky-600 to-indigo-700 text-white">
              <tr>
                <th className="py-6 px-8 text-left">Давуу тал</th>
                <th className="py-6 px-8">Bronze</th>
                <th className="py-6 px-8">Silver</th>
                <th className="py-6 px-8">Gold</th>
                <th className="py-6 px-8">Platinum</th>
                <th className="py-6 px-8">Diamond</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-5 px-8 font-medium">Хуримтлагдсан оноо</td>
                <td className="text-center">1x</td>
                <td className="text-center">1.2x</td>
                <td className="text-center">1.5x</td>
                <td className="text-center">2x</td>
                <td className="text-center">3x</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="py-5 px-8 font-medium">Тусгай хөнгөлөлт</td>
                <td className="text-center">-</td>
                <td className="text-center">5%</td>
                <td className="text-center">10%</td>
                <td className="text-center">15%</td>
                <td className="text-center">20%</td>
              </tr>
              <tr className="border-b">
                <td className="py-5 px-8 font-medium">
                  Тэргүүн ээлжийн захиалга
                </td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="py-5 px-8 font-medium">Бэлэг, сюрприз</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓✓</td>
              </tr>
              <tr>
                <td className="py-5 px-8 font-medium">Хувийн менежер</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">-</td>
                <td className="text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-carousel {
          animation: carousel 40s linear infinite;
        }
        .bg-bronze-linear {
          background: linear-linear(to bottom, #cd7f32, #a0522d);
        }
        .bg-silver-linear {
          background: linear-linear(to bottom, #c0c0c0, #808080);
        }
      `}</style>
    </div>
  );
}
