import { useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, X, Upload, Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import type { Tour } from "@/types";
import * as React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function ManagerDashboard() {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTourId, setEditingTourId] = useState<string | null>(null);

  // Cover Photo State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Gallery Photos State
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    country: "",
    departure_date: "",
    arrival_date: "",
    hotel: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    single_supply_price: "",
    additional_bed: "",
    country_temperature: "",
    status: "ACTIVE",
    seats: 20,
    duration_day: "",
    duration_night: "",
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  };

  const { data: tours = [], isLoading: loading } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await axios.get("/api/tours");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tours/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      toast.success("Deleted!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (editingTourId) {
        return axios.put(`/api/tours/${editingTourId}`, data, getAuthHeaders());
      } else {
        return axios.post("/api/tours", data, getAuthHeaders());
      }
    },
    onSuccess: () => {
      toast.success(editingTourId ? "Updated!" : "Created!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      closeModal();
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        console.error("Error message:", err.message);
        toast.error("Failed to save tour");
      }
    },
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm(`Delete this tour?`)) return;
    deleteMutation.mutate(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();

    // 1. Append all text fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // 2. Append the new Cover Photo (if changed)
    if (selectedFile) {
      data.append("cover_photo", selectedFile);
    }

    // 3. Append NEW gallery images
    galleryFiles.forEach((file) => {
      data.append("photos", file); // These are new files to upload
    });

    // 4. Append EXISTING gallery images (The Fix)
    // We send this as a JSON string so the backend knows which URLs to keep.
    // If the user deleted an image from the UI, it won't be in this array.
    data.append("existing_photos", JSON.stringify(existingPhotos));

    saveMutation.mutate(data);
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
        arrival_date: tour.arrival_date ? tour.arrival_date.split("T")[0] : "",
        hotel: tour.hotel || "",
        breakfast: tour.breakfast || "",
        lunch: tour.lunch || "",
        dinner: tour.dinner || "",
        single_supply_price: tour.single_supply_price || "",
        additional_bed: tour.additional_bed || "",
        country_temperature: tour.country_temperature || "",
        status: tour.status || "ACTIVE",
        seats: tour.seats || 20,
        duration_day: tour.duration_day || "",
        duration_night: tour.duration_night || "",
      });
      setPreviewUrl(tour.image);

      try {
        if (Array.isArray(tour.photos)) {
          setExistingPhotos(tour.photos);
        } else if (typeof tour.photos === "string") {
          setExistingPhotos(JSON.parse(tour.photos));
        } else {
          setExistingPhotos([]);
        }
      } catch (e: unknown) {
        if (e) {
          console.log("y u reading this?");
        }
        setExistingPhotos([]);
      }
    } else {
      setEditingTourId(null);
      setFormData({
        title: "",
        description: "",
        country: "",
        departure_date: "",
        arrival_date: "",
        hotel: "",
        breakfast: "",
        lunch: "",
        dinner: "",
        single_supply_price: "",
        additional_bed: "",
        country_temperature: "",
        status: "ACTIVE",
        seats: 20,
        duration_day: "",
        duration_night: "",
      });
      setPreviewUrl(null);
      setExistingPhotos([]);
    }

    setSelectedFile(null);
    setGalleryFiles([]);
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

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setGalleryFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove an EXISTING file (from the database list)
  const removeExistingPhoto = (index: number) => {
    setExistingPhotos((prev) => prev.filter((_, i) => i !== index));
  };

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
      case "FULL":
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Tour Management ✈️
          </h1>
          <button
            onClick={() => openModal()}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-amber-600 dark:bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-700 dark:hover:bg-amber-600 transition shadow-lg">
            <Plus className="h-5 w-5" /> Аялал нэмэх
          </button>
        </div>

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
                tours.map((tour: Tour) => (
                  <tr
                    key={tour.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                    <td className="p-2 flex items-center gap-4">
                      <img
                        src={tour.image || "https://placehold.co/100x60"}
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
                          tour.status
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
                    <td className="p-2 text-right space-x-2">
                      <button
                        onClick={() => openModal(tour)}
                        className="p-2 cursor-pointer text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full">
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full"
                        onClick={() => handleDelete(tour.id || "")}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-gray-800 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 shrink-0">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {editingTourId ? "Edit Tour" : "New Tour"}
              </h2>
              <button
                className="cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={closeModal}>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <form id="tourForm" onSubmit={handleSubmit} className="space-y-6">
                {/* Top Section: Images & Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column: Images */}
                  <div className="md:col-span-1 space-y-4">
                    {/* Cover Photo */}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Cover Photo
                      </label>
                      <div className="relative h-32 w-full rounded-lg bg-gray-100 dark:bg-gray-700 border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden group">
                        {previewUrl ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 dark:text-gray-500 text-xs">
                            No Cover
                          </span>
                        )}
                        <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer text-white text-xs font-medium">
                          <Upload className="h-4 w-4 mr-1" /> Change
                          <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>

                    {/* Gallery */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                          Gallery
                        </label>
                        <label className="cursor-pointer text-blue-600 dark:text-blue-400 text-xs hover:underline flex items-center">
                          <Plus className="h-3 w-3 mr-1" /> Add
                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={handleGalleryChange}
                            accept="image/*"
                          />
                        </label>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {/* Existing Photos Loop */}
                        {existingPhotos.slice(0, 6).map((url, idx) => (
                          <div
                            key={`ex-${idx}`}
                            className="aspect-square rounded bg-gray-100 dark:bg-gray-700 overflow-hidden relative group">
                            <img
                              src={url}
                              className="w-full h-full object-cover"
                            />

                            {/* Add this Delete Button */}
                            <button
                              type="button"
                              onClick={() => removeExistingPhoto(idx)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {galleryFiles.slice(0, 3).map((file, idx) => (
                          <div
                            key={`new-${idx}`}
                            className="aspect-square rounded bg-blue-50 dark:bg-blue-900/20 overflow-hidden relative border border-blue-200 dark:border-blue-800">
                            <img
                              src={URL.createObjectURL(file)}
                              className="w-full h-full object-cover opacity-80"
                            />
                            <button
                              type="button"
                              onClick={() => removeGalleryFile(idx)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                        {existingPhotos.length + galleryFiles.length === 0 && (
                          <div className="col-span-3 text-center py-2 text-xs text-gray-400 border border-dashed border-gray-300 dark:border-gray-700 rounded">
                            No photos
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Inputs */}
                  <div className="md:col-span-2 space-y-4">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Title
                      </label>
                      <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        required
                      />
                    </div>

                    {/* Row 1: Country, Price, Hotel */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Country
                        </label>
                        <input
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Price (₮)
                        </label>
                        <input
                          name="single_supply_price"
                          value={formData.single_supply_price}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Hotel
                        </label>
                        <input
                          name="hotel"
                          value={formData.hotel}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 2: Dates */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="departure_date"
                          value={formData.departure_date}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          End Date
                        </label>
                        <input
                          type="date"
                          name="arrival_date"
                          value={formData.arrival_date}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Compact Stats (Status, Seats, Days, Nights) */}
                    <div className="grid grid-cols-4 gap-3">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Status
                        </label>
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none">
                          <option value="ACTIVE">Active</option>
                          <option value="FULL">Full</option>
                          <option value="INACTIVE">Inactive</option>
                          <option value="COMPLETED">Done</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Seats
                        </label>
                        <input
                          type="number"
                          name="seats"
                          value={formData.seats}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Days
                        </label>
                        <input
                          name="duration_day"
                          value={formData.duration_day}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Nights
                        </label>
                        <input
                          name="duration_night"
                          value={formData.duration_night}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-2 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 4: Meals */}
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Breakfast
                        </label>
                        <input
                          name="breakfast"
                          value={formData.breakfast}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Lunch
                        </label>
                        <input
                          name="lunch"
                          value={formData.lunch}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Dinner
                        </label>
                        <input
                          name="dinner"
                          value={formData.dinner}
                          onChange={handleChange}
                          className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-1.5 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description - Full Width & Taller */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={6}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:border-amber-500 outline-none resize-none"
                  />
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3 shrink-0">
              <button
                disabled={saveMutation.isPending}
                type="button"
                onClick={closeModal}
                className="px-5 py-2 cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                Cancel
              </button>
              <button
                disabled={saveMutation.isPending}
                type="submit"
                form="tourForm"
                className="px-6 py-2 cursor-pointer text-sm font-bold bg-amber-600 dark:bg-amber-500 text-white rounded-lg hover:bg-amber-700 dark:hover:bg-amber-600 flex items-center gap-2 transition">
                {saveMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Save Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
