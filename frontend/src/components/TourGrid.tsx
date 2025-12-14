import { MapPin, Clock, Users } from "lucide-react";

export default function TourGrid() {
  const tours = [
    {
      id: 1,
      title: "Хайнан Аялал",
      location: "Mongolia",
      duration: "5 өдөр",
      groupSize: "8-12",
      price: "$899",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    },
    {
      id: 2,
      title: "Бээжин Соёлын Аялал",
      location: "Хятад",
      duration: "3 өдөр",
      groupSize: "10-15",
      price: "$599",
      image:
        "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
    },
    {
      id: 3,
      title: "Сингапур Эксплорер",
      location: "Сингапур",
      duration: "7 өдөр",
      groupSize: "6-10",
      price: "$1,299",
      image:
        "https://images.unsplash.com/photo-1585069893596-4ab2d619a2e9?w=800&q=80",
    },
    {
      id: 4,
      title: "Торгоний Хөндий Аялал",
      location: "Хятад",
      duration: "10 өдөр",
      groupSize: "12-16",
      price: "$1,799",
      image:
        "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=800&q=80",
    },
    {
      id: 5,
      title: "Steppe Horseback Riding",
      location: "Mongolia",
      duration: "4 days",
      groupSize: "4-8",
      price: "$749",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    },
    {
      id: 6,
      title: "Cultural Discovery",
      location: "China",
      duration: "6 days",
      groupSize: "10-14",
      price: "$999",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    },
  ];

  return (
    <div className="container mx-auto my-20 py-12">
      <div className="flex justify-between">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Онцлох Аялалууд
        </h2>
        <button className="relative mb-12 text-3xl font-bold text-gray-900">
          Бүх Аялалыг Харах
          <span className="absolute left-1/2 -bottom-[15px] w-64 h-0.5 bg-gray-900 -translate-x-1/2"></span>
          <span className="absolute left-[calc(50%+116px)] -bottom-5 w-3 h-3 border-r-2 border-b-2 border-gray-900 -rotate-45"></span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 group"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
                {tour.price}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {tour.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{tour.groupSize} people</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="w-full py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors">
                  View Details
                </button>
                <button className="w-full py-2 rounded-md text-sm font-medium text-white bg-green-500 hover:bg-green-700 hover:border-gray-400 transition-colors">
                  Order Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
