import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Edit, Plus, Loader2, X } from "lucide-react";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Tour } from "@/types";

const tourSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().min(1),
  description: z.string().min(10),
  country: z.string().min(2),
  duration_day: z.string().min(1),
  duration_night: z.string().min(1),
  group_size: z.coerce.number().min(1),
  seats: z.coerce.number().min(0),
  is_featured: z.boolean(),
  status: z.enum(["ACTIVE", "FULL", "COMPLETED", "INACTIVE"]),
  hotel: z.string().nullable().optional(),
  breakfast: z.string().nullable().optional(),
  lunch: z.string().nullable().optional(),
  dinner: z.string().nullable().optional(),
  single_supply_price: z.string().nullable().optional(),
  additional_bed: z.string().nullable().optional(),
  country_temperature: z.string().nullable().optional(),
  departure_date: z.string().nullable().optional(),
  arrival_date: z.string().nullable().optional(),
  cover_photo: z.string().url().nullable().optional(),
  image_public_id: z.string().nullable().optional(),
  slug: z.string().nullable().optional(),
  photos: z.string().nullable().optional(),
});

type TourFormData = z.infer<typeof tourSchema>;

const fetchTours = async (): Promise<Tour[]> => {
  const res = await fetch("/api/tours");
  if (!res.ok) throw new Error("Ачаалахад алдаа гарлаа");
  return res.json();
};

const upsertTour = async (data: TourFormData & { id?: string }) => {
  const { id, ...body } = data;
  const method = id ? "PUT" : "POST";
  const url = id ? `/api/tours/${id}` : "/api/tours";
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Хадгалахад алдаа гарлаа");
  }
  return res.json();
};

const deleteTour = async (id: string) => {
  const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Устгахад алдаа гарлаа");
};

function TourFormModal({
  tour,
  onClose,
}: {
  tour?: Tour | null;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const methods = useForm<TourFormData>({
    resolver: zodResolver(tourSchema) as any,
    defaultValues: tour
      ? {
          title: tour.title,
          subtitle: tour.subtitle,
          description: tour.description,
          country: tour.country,
          duration_day: tour.duration_day,
          duration_night: tour.duration_night,
          group_size: tour.group_size,
          seats: tour.seats,
          is_featured: tour.is_featured,
          status: tour.status,
          hotel: tour.hotel ?? undefined,
          single_supply_price: tour.single_supply_price ?? undefined,
          additional_bed: tour.additional_bed ?? undefined,
          country_temperature: tour.country_temperature ?? undefined,
          departure_date: tour.departure_date ?? undefined,
          arrival_date: tour.arrival_date ?? undefined,
          cover_photo: tour.cover_photo ?? undefined,
          image_public_id: tour.image_public_id ?? undefined,
          slug: tour.slug ?? undefined,
          photos: tour.photos ?? undefined,
        }
      : {
          title: "",
          subtitle: "",
          description: "",
          country: "",
          duration_day: "7",
          duration_night: "6",
          group_size: 10,
          seats: 20,
          is_featured: false,
          status: "ACTIVE",
          hotel: undefined,
          breakfast: undefined,
          lunch: undefined,
          dinner: undefined,
          single_supply_price: undefined,
          additional_bed: undefined,
          country_temperature: undefined,
          departure_date: undefined,
          arrival_date: undefined,
          image: undefined,
          image_public_id: undefined,
          slug: undefined,
          photos: undefined,
        },
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    setIsSaving(true);
    try {
      await upsertTour({
        ...data,
        id: tour?.id,
        title: "",
        subtitle: "",
        description: "",
        country: "",
        duration_day: "",
        duration_night: "",
        group_size: 0,
        seats: 0,
        is_featured: false,
        status: "ACTIVE",
      });
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Алдаа: ${err.message}`);
      }
    } finally {
      setIsSaving(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">Аяллын нэр</label>
            <input
              {...methods.register("title")}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Дэд гарчиг</label>
            <input
              {...methods.register("subtitle")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Улс</label>
            <input
              {...methods.register("country")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Өдөр</label>
            <input
              {...methods.register("duration_day")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Шөнө</label>
            <input
              {...methods.register("duration_night")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Бүлэг (хүн)
            </label>
            <input
              type="number"
              {...methods.register("group_size", { valueAsNumber: true })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Тайлбар</label>
          <textarea
            {...methods.register("description")}
            rows={5}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Нэг өрөө нэмэлт
            </label>
            <input
              {...methods.register("single_supply_price")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Нэмэлт ор</label>
            <input
              {...methods.register("additional_bed")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Цаг агаар</label>
            <input
              {...methods.register("country_temperature")}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...methods.register("is_featured")}
              className="rounded"
            />
            <span>Онцлох аялал</span>
          </label>
          <div>
            <label className="block text-sm font-medium mb-1">Төлөв</label>
            <select
              {...methods.register("status")}
              className="px-4 py-2 border rounded-lg">
              <option value="ACTIVE">Идэвхтэй</option>
              <option value="FULL">Дүүрсэн</option>
              <option value="COMPLETED">Дууссан</option>
              <option value="INACTIVE">Идэвхгүй</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">
            Болих
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2">
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {tour ? "Шинэчлэх" : "Үүсгэх"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

export default function AdminTours() {
  const queryClient = useQueryClient();
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tours"] }),
  });

  if (isLoading) {
    return (
      <div className="p-12 text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Аялалууд</h1>
        <button
          onClick={() => setEditingTour({} as Tour)}
          className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
          <Plus className="w-5 h-5" />
          Шинэ Аялал
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">{tour.title}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingTour(tour)}
                  className="p-2 hover:bg-blue-50 rounded">
                  <Edit className="w-5 h-5 text-blue-600" />
                </button>
                <button
                  onClick={() => deleteMutation.mutate(tour.id)}
                  className="p-2 hover:bg-red-50 rounded">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{tour.subtitle}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <div>
                {tour.country} • {tour.duration_day} өдөр
              </div>
              <div>
                {tour.group_size} хүн • {tour.seats} суудал үлдсэн
              </div>
              {tour.is_featured && (
                <span className="inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                  Онцлох
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingTour !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {editingTour.id ? "Засварлах" : "Шинэ Аялал Үүсгэх"}
              </h2>
              <button
                onClick={() => setEditingTour(null)}
                className="p-2 hover:bg-gray-100 rounded">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              <TourFormModal
                tour={editingTour.id ? editingTour : null}
                onClose={() => setEditingTour(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
