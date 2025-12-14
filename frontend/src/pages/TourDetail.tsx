import { MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface TourDetail {
  id: string;
  title: string;
  description: string;
  image: string | null;
  country: string;
  departure_date: string | null;
  hotel: string | null;
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
  price: string | null;
  additional_bed: string | null;
  country_temperature: string | null;
}

async function fetchTour(id: string): Promise<TourDetail> {
  const res = await axios.get(`/api/trips/${id}`);
  return res.data;
}

export default function TourDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    data: tour,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trip", id],
    queryFn: () => fetchTour(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="container mx-auto py-20 text-center">
        Ачааллаж байна...
      </div>
    );
  if (error || !tour)
    return (
      <div className="container mx-auto py-20 text-center text-red-600">
        Аялал олдсонгүй 😢
      </div>
    );

  const mealIncluded = (meal: string | null) =>
    meal?.toLowerCase().includes("багтсан") ||
    meal?.toLowerCase().includes("included");

  return (
    <div className="container mx-auto py-12 px-4">
      <Link
        to="/trips"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
        Бүх аялал руу буцах
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <img
            src={
              tour.image || "https://via.placeholder.com/1200x800?text=No+Image"
            }
            alt={tour.title}
            className="w-full rounded-xl shadow-xl object-cover max-h-[600px]"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {tour.title}
          </h1>

          <div className="flex flex-wrap gap-6 mb-8 text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{tour.country}</span>
            </div>
            {tour.departure_date && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>
                  Явах:{" "}
                  {new Date(tour.departure_date).toLocaleDateString("mn-MN")}
                </span>
              </div>
            )}
            {tour.hotel && (
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Буудал: {tour.hotel}</span>
              </div>
            )}
          </div>

          {tour.price && (
            <div className="text-4xl font-bold text-green-600 mb-8">
              {tour.price.includes("₮") ? tour.price : `₮${tour.price}`}
            </div>
          )}

          <p className="text-lg text-gray-700 leading-relaxed mb-10">
            {tour.description}
          </p>

          <div className="space-y-4 mb-10">
            <h3 className="text-xl font-semibold">Хоол хүнс:</h3>
            <div className="flex flex-wrap gap-4">
              {mealIncluded(tour.breakfast) && (
                <span className="text-green-600 font-medium">
                  🍳 Өглөөний цай багтсан
                </span>
              )}
              {mealIncluded(tour.lunch) && (
                <span className="text-green-600 font-medium">
                  🍱 Өдрийн хоол багтсан
                </span>
              )}
              {mealIncluded(tour.dinner) && (
                <span className="text-green-600 font-medium">
                  🍽️ Оройн хоол багтсан
                </span>
              )}
            </div>
          </div>

          {tour.additional_bed && (
            <p className="text-gray-600 mb-6">
              <strong>Нэмэлт ор:</strong> {tour.additional_bed}
            </p>
          )}

          <button className="w-full py-4 rounded-lg text-xl font-bold text-white bg-green-500 hover:bg-green-600 transition">
            Одоо захиалах 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
