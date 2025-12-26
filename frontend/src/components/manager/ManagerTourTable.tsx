import { Edit, Trash2, Users, Loader2 } from "lucide-react";
import type { Tour } from "@/types";

interface TourTableProps {
  tours: Tour[];
  loading: boolean;
  onEdit: (tour: Tour) => void;
  onDelete: (id: string) => void;
}

export default function ManagerTourTable({
  tours,
  loading,
  onEdit,
  onDelete,
}: TourTableProps) {
  const formatPrice = (price: number | string) => {
    if (!price) return "0";
    return Number(price).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400";
      case "COMPLETED":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400";
      case "INACTIVE":
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 uppercase text-sm font-semibold">
          <tr>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700">
              Аялал
            </th>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700">
              Departure
            </th>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700">
              Status
            </th>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700">
              Суудал
            </th>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700">
              Үнэ
            </th>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700">
              Хүүхдийн Үнэ
            </th>
            <th className="px-2 py-4 border-b border-gray-200 dark:border-gray-700 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {loading ? (
            <tr>
              <td colSpan={6} className="p-8 text-center">
                <Loader2 className="animate-spin mx-auto text-gray-500 dark:text-gray-400" />
              </td>
            </tr>
          ) : (
            tours.map((tour) => (
              <tr
                key={tour.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                <td className="p-2 flex items-center gap-4">
                  <img
                    src={tour.cover_photo || "https://placehold.co/100x60"}
                    alt=""
                    className="h-12 w-16 rounded object-cover bg-gray-200 dark:bg-gray-700"
                  />
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100">
                      {tour.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tour.country}
                    </div>
                  </div>
                </td>
                <td className="text-gray-700 dark:text-gray-300">
                  <div>
                    {tour.departure_date
                      ? tour.departure_date.split("T")[0]
                      : ""}
                  </div>
                </td>
                <td className="p-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                      tour.status || ""
                    )}`}>
                    {tour.status}
                  </span>
                </td>
                <td className="p-2 text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {tour.seats}
                  </div>
                </td>
                <td className="p-2 font-bold text-amber-600 dark:text-amber-400">
                  ₮{formatPrice(tour.single_supply_price || "")}
                </td>
                <td className="p-2 font-bold text-amber-600 dark:text-amber-400">
                  ₮{formatPrice(tour.child_price || "")}
                </td>
                <td className="p-2 text-right space-x-2">
                  <button
                    onClick={() => onEdit(tour)}
                    className="p-2 cursor-pointer text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"
                    onClick={() => onDelete(tour.id || "")}>
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
