import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X, Upload, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Tour } from "@/types";
import * as React from "react";
// 1. Fix Interface to match Database Column Name

export default function ManagerDashboard() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);
 
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    country: "",
    departure_date: "",
    hotel: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    single_supply_price: "",
    additional_bed: "",
    country_temperature: "",
    status: "ACTIVE",
    seats: 20,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  };

  const fetchTours = async () => {
    try {
      const res = await axios.get("/api/tours");
      setTours(res.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      toast.error("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id: string) => {
  
    if (!window.confirm(`Delete random tour?`)) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTours(tours.filter((t) => t.id !== id));
      toast.success("Deleted!");
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (selectedFile) {
      data.append("cover_photo", selectedFile);
    }

    try {
      setLoading(true)
      if (editingTourId) {
        const res = await axios.put(
          `/api/tours/${editingTourId}`,
          data,
          getAuthHeaders()
        );
        setTours(
          tours.map((t) => (t.id === editingTourId ? res.data.tour : t))
        );
        toast.success("Updated!");
      } else {
        const res = await axios.post("/api/tours", data, getAuthHeaders());
        setTours([res.data.tour, ...tours]);
        toast.success("Created!");
      }
      closeModal();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      toast.error("Failed to save");
    }finally{setLoading(false)}
  };

  const openModal = (tour?: Tour) => {
    if (tour) {
      setEditingTourId(tour.id);
      setFormData({
        title: tour.title || "",
        description: tour.description || "",
        country: tour.country || "",
        departure_date: tour.departure_date
          ? tour.departure_date.split("T")[0]
          : "",
        hotel: tour.hotel || "",
        breakfast: tour.breakfast || "",
        lunch: tour.lunch || "",
        dinner: tour.dinner || "",
        single_supply_price: tour.single_supply_price || "", // 👈 Use correct field
        additional_bed: tour.additional_bed || "",
        country_temperature: tour.country_temperature || "",
        status: tour.status || "ACTIVE",
        seats: tour.seats || 20,
      });
      setPreviewUrl(tour.image);
    } else {
      setEditingTourId(null);
      setFormData({
        title: "",
        description: "",
        country: "",
        departure_date: "",
        hotel: "",
        breakfast: "",
        lunch: "",
        dinner: "",
        single_supply_price: "",
        additional_bed: "",
        country_temperature: "",
        status: "ACTIVE",
        seats: 20,
      });
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-100 text-green-800";
      case "COMPLETED":
        return "bg-red-100 text-red-800";
      case "INACTIVE":
        return "bg-gray-100 text-gray-800";
      case "FULL":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto ">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Tour Management ✈️
          </h1>
          <button
            onClick={() => openModal()}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-bold text-white hover:bg-amber-700 transition shadow-lg">
            <Plus className="h-5 w-5" /> Аялал нэмэх
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
              <tr className="">
                <th className="px-2 py-4 border-b">Аялал</th>
                <th className="px-2 py-4 border-b">Departure</th>
                <th className="px-2 py-4 border-b">Status</th>
                <th className="px-2 py-4 border-b">Суудал</th>
                <th className="px-2 py-4 border-b">Үнэ</th>
                <th className="px-2 py-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Loader2 className="animate-spin mx-auto" />
                  </td>
                </tr>
              ) : (
                tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 flex items-center gap-4">
                      <img
                        src={tour.image || "https://placehold.co/100x60"}
                        alt=""
                        className="h-12 w-16 rounded object-cover bg-gray-200"
                      />
                      <div>
                        <div className="font-bold text-gray-900">
                          {tour.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tour.country}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>{tour.departure_date}</div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                          tour.status
                        )}`}>
                        {tour.status}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" /> {tour.seats}
                      </div>
                    </td>
                    {/* 👇 FIXED: Using single_supply_price */}
                    <td className="p-2 font-bold text-amber-600">
                      ₮{tour.single_supply_price}
                    </td>
                    <td className="p-2 text-right space-x-2">
                      <button
                        onClick={() => openModal(tour)}
                        className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-full">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button className="p-2 cursor-pointer text-red-600 hover:bg-blue-50 rounded-full" onClick={()=>{handleDelete(tour.id)}}>
                            <Trash2 className="h-5 w-5"/>
                      </button>
                    
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl my-8">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingTourId ? "Edit Tour" : "New Tour"}
              </h2>
              <button className="cursor-pointer" onClick={closeModal}>
                <X className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload Section */}
              <div className="flex items-center gap-6">
                <div className="h-32 w-48 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </div>
                <div>
                  <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition inline-flex items-center gap-2 ">
                    <Upload className="h-4 w-4" /> Upload Photo
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Recommended: 1200x800px
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                    required
                  />
                </div>

                {/* Status & Seats */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none">
                    <option value="ACTIVE">🟢 ACTIVE</option>
                    <option value="FULL">🔴 FULL</option>
                    <option value="INACTIVE">⚫ INACTIVE</option>
                    <option value="COMPLETED">⚫ COMPLETED</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    name="departure_date"
                    value={formData.departure_date}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price (₮)
                  </label>
                  <input
                    name="single_supply_price"
                    value={formData.single_supply_price}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hotel
                  </label>
                  <input
                    name="hotel"
                    value={formData.hotel}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Breakfast
                  </label>
                  <input
                    name="breakfast"
                    placeholder="Breakfast"
                    value={formData.breakfast}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lunch
                  </label>
                  <input
                    name="lunch"
                    placeholder="Lunch"
                    value={formData.lunch}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dinner
                  </label>
                  <input
                    name="dinner"
                    placeholder="Dinner"
                    value={formData.dinner}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                disabled={loading}
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 cursor-pointer text-gray-600 hover:bg-gray-100 rounded-lg">
                  Буцах
                </button>
                <button
                disabled={loading}
                  type="submit"
                  className="px-6 py-2 cursor-pointer bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold">
                  Аялал хадгалах
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
