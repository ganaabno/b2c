import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Plus } from "lucide-react";
import { useState } from "react";
import type { Tour } from "@/types";

async function fetchTours(): Promise<Tour[]> {
  const res = await fetch("/api/tours");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}

async function deleteTour(id: string) {
  await fetch(`/api/tours/${id}`, { method: "DELETE" });
}

export default function AdminTours() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data: tours, isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tours"] }),
  });

  if (isLoading)
    return <div className="p-8 text-center">Ачааллаж байна...</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Аялал Удирдлага</h1>
        <button
          onClick={() => setEditingId("new")}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          <Plus className="w-5 h-5" /> Шинэ Аялал Нэмэх
        </button>
      </div>

      <div className="grid gap-6">
        {tours?.map((tour) => (
          <div
            key={tour.id}
            className="bg-white border rounded-lg p-6 shadow hover:shadow-md">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{tour.title}</h3>
                <p className="text-gray-600 mt-1">{tour.subtitle}</p>
                <div className="flex gap-4 mt-3 text-sm text-gray-500">
                  <span>{tour.country}</span>
                  <span>•</span>
                  <span>{tour.duration_day}</span>
                  <span>•</span>
                  <span>{tour.group_size} хүн</span>
                  {tour.is_featured && (
                    <span className="text-green-600 font-medium">Онцлох</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditingId(tour.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(tour.id || "")}
                  className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simple Edit Form Modal (we'll expand this next if you want full form) */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-screen overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingId === "new" ? "Шинэ Аялал" : "Засварлах"}
            </h2>
            <p className="text-gray-600 mb-8">
              Full form coming soon! For now, edit directly in Neon console or
              add via SQL.
            </p>
            <button
              onClick={() => setEditingId(null)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg">
              Хаах
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
