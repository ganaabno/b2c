import { useState, useEffect } from "react";
import { X, Upload, Plus, Loader2 } from "lucide-react";
import type { Tour } from "@/types";
import {
  Hainan_Default,
  Bali_Default,
  Dalyan_Default,
  Halong_Bay_Default,
  HoChiMinh_Phu_Quoc_Default,
  Janjieje_Default,
  Japan_Default,
  Nha_Trang_Default,
  Phu_Quoc_Default,
  Shanghai_Default,
  Singapore_Default,
  Thailand_Banggok_Default,
  Turkey_Default,
  Phuket_Default,
} from "./ManagerDefaultData";
import * as React from "react";
interface ManagerTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourToEdit: Tour | null;
  onSave: (formData: FormData) => void;
  isSaving: boolean;
}

const INITIAL_FORM_STATE = {
  title: "",
  description: "",
  country: "",
  departure_date: "",
  arrival_date: "",
  hotel: "",
  single_supply_price: "",
  additional_bed: "",
  country_temperature: "",
  status: "ACTIVE",
  seats: 20,
  duration_day: "",
  duration_night: "",
  genre: "",
  cover_photo: "",
  child_price: "",
  group_size: "",
};

export default function ManagerTourModal({
  isOpen,
  onClose,
  tourToEdit,
  onSave,
  isSaving,
}: ManagerTourModalProps) {
  const [formData, setFormData] = useState<any>(INITIAL_FORM_STATE);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]);

  // --- GENRE DEFAULT DATA LOGIC ---
  useEffect(() => {
    // Only apply defaults if we are NOT in edit mode (or if you want to overwrite edits)
    // Assuming we only want this when creating new or explicitly changing genre
    if (!tourToEdit) {
      if (formData.genre === "Hainan") {
        setFormData((prev: any) => ({ ...prev, ...Hainan_Default }));
      }
      if (formData.genre === "Bali") {
        setFormData((prev: any) => ({ ...prev, ...Bali_Default }));
      }
      if (formData.genre === "Dalyan") {
        setFormData((prev: any) => ({ ...prev, ...Dalyan_Default }));
      }
      if (formData.genre === "Halong_Bay") {
        setFormData((prev: any) => ({ ...prev, ...Halong_Bay_Default }));
      }
      if (formData.genre === "HoChiMinh_Phu_Quoc") {
        setFormData((prev: any) => ({
          ...prev,
          ...HoChiMinh_Phu_Quoc_Default,
        }));
      }
      if (formData.genre === "Janjieje") {
        setFormData((prev: any) => ({ ...prev, ...Janjieje_Default }));
      }
      if (formData.genre === "Japan") {
        setFormData((prev: any) => ({ ...prev, ...Japan_Default }));
      }
      if (formData.genre === "Nha_Trang") {
        setFormData((prev: any) => ({ ...prev, ...Nha_Trang_Default }));
      }
      if (formData.genre === "Phu_Quoc") {
        setFormData((prev: any) => ({ ...prev, ...Phu_Quoc_Default }));
      }
      if (formData.genre === "Shanghai") {
        setFormData((prev: any) => ({ ...prev, ...Shanghai_Default }));
      }
      if (formData.genre === "Singapore") {
        setFormData((prev: any) => ({ ...prev, ...Singapore_Default }));
      }
      if (formData.genre === "Thailand_Banggok") {
        setFormData((prev: any) => ({ ...prev, ...Thailand_Banggok_Default }));
      }
      if (formData.genre === "Turkey") {
        setFormData((prev: any) => ({ ...prev, ...Turkey_Default }));
      }
      if (formData.genre === "Phuket") {
        setFormData((prev: any) => ({ ...prev, ...Phuket_Default }));
      }
    }
  }, [formData.genre, tourToEdit]);

  // --- SYNC PREVIEW WITH FORM DATA (Fix for Dropdown/Defaults) ---
  useEffect(() => {
    // If user hasn't uploaded a file manually, try to use the formData.cover_photo
    if (!selectedFile) {
      const photo = formData.cover_photo;
      // FIX: Only set preview if it's a valid URL (starts with http/https)
      // This prevents "Dalyan" or "Turkey" from causing GET 400 errors
      if (
        typeof photo === "string" &&
        (photo.startsWith("http") || photo.startsWith("data:"))
      ) {
        setPreviewUrl(photo);
      } else if (!photo) {
        setPreviewUrl(null);
      }
    }
  }, [formData.cover_photo, selectedFile]);

  // --- DATA POPULATION LOGIC ---
  useEffect(() => {
    if (isOpen) {
      if (tourToEdit) {
        // EDIT MODE: Populate form
        setFormData({
          title: tourToEdit.title || "",
          description: tourToEdit.description || "",
          country: tourToEdit.country || "",
          departure_date: tourToEdit.departure_date
            ? tourToEdit.departure_date.split("T")[0]
            : "",
          arrival_date: tourToEdit.arrival_date
            ? tourToEdit.arrival_date.split("T")[0]
            : "",
          hotel: tourToEdit.hotel || "",
          child_price: tourToEdit.child_price || "",
          single_supply_price: tourToEdit.single_supply_price || "",
          additional_bed: tourToEdit.additional_bed || "",
          country_temperature: tourToEdit.country_temperature || "",
          status: tourToEdit.status || "ACTIVE",
          seats: tourToEdit.seats || 20,
          duration_day: tourToEdit.duration_day || "",
          duration_night: tourToEdit.duration_night || "",
          cover_photo: tourToEdit.cover_photo || "",
          genre: tourToEdit.genre || "",
          group_size: tourToEdit.group_size || "",
        });
        // Set initial preview from edit data
        if (
          tourToEdit.cover_photo &&
          tourToEdit.cover_photo.startsWith("http")
        ) {
          setPreviewUrl(tourToEdit.cover_photo);
        } else {
          setPreviewUrl(null);
        }
        // Handle Gallery Photos safely
        try {
          if (Array.isArray(tourToEdit.photos)) {
            setExistingPhotos(tourToEdit.photos);
          } else if (typeof tourToEdit.photos === "string") {
            setExistingPhotos(JSON.parse(tourToEdit.photos));
          } else {
            setExistingPhotos([]);
          }
        } catch {
          setExistingPhotos([]);
        }
      } else {
        // CREATE MODE: Reset form
        
        setFormData(INITIAL_FORM_STATE);
        setPreviewUrl(null);
        setExistingPhotos([]);
      }
      // Always clear new file selections when opening
      setSelectedFile(null);
      setGalleryFiles([]);
    }
  }, [isOpen, tourToEdit]);

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
      setGalleryFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (selectedFile) data.append("cover_photo", selectedFile);
    galleryFiles.forEach((file) => data.append("photos", file));
    data.append("existing_photos", JSON.stringify(existingPhotos));
    onSave(data);
  };

  if (!isOpen) return null;

  // Styles
  const inputClass =
    "w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 focus:border-amber-500 dark:focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors placeholder-gray-400 dark:placeholder-slate-500";
  const labelClass =
    "block text-xs font-semibold text-gray-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity">
      <div className="w-full max-w-4xl max-h-[85vh] flex flex-col rounded-2xl bg-white dark:bg-slate-800 shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700/80 shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {tourToEdit ? "Аялалын мэдээлэл засах" : "Шинэ аялал үүсгэх"}
            </h2>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              Зураг оруулахад анхаарах нь : Нүүр зураг оруулахдаа 2 сонголтын
              зөвхөн нэгийг л сонгоно уу :)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer rounded-full text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form id="tourForm" onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left Column: Images */}
              <div className="md:col-span-1 space-y-6">
                {/* Cover Photo Input */}
                <div>
                  <label className={labelClass}>Нүүр зураг</label>
                  <div className="relative h-40 w-full rounded-xl bg-gray-50 dark:bg-slate-900/50 border-2 border-dashed border-gray-300 dark:border-slate-600 hover:border-amber-500 dark:hover:border-amber-500 transition-colors flex items-center justify-center overflow-hidden group">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 dark:text-slate-500 mb-2" />
                        <span className="text-gray-400 dark:text-slate-500 text-xs">
                          Нүүр зураг оруулах
                        </span>
                      </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-sm font-medium backdrop-blur-[2px]">
                      <Upload className="h-4 w-4 mr-2" /> Зураг солих
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
                {/* END NUUR ZURAGNUUDIIN URL IIG ORUULNA */}
                <div>
                  <label className={labelClass}>Нүүр зураг сонгох</label>
                  <select
                    name="cover_photo"
                    value={formData.cover_photo}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className={inputClass}
                  >
                    <option value="">Хоосон</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766721920/travel-app-tours/gezmh8amjydc10ywcak7.png">
                      Hainan
                    </option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766810774/%D0%A5%D0%9E-%D0%A8%D0%98-%D0%9C%D0%98%D0%9D-%D0%A4%D0%A3-%D0%9A%D0%A3%D0%9E%D0%9A_b7lzko.webp">
                      HoChiMinh_Phu_Quoc
                    </option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766813643/idk_epgdsd.jpg">Japan</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766815290/nha-trang_ocwlhc.avif">Nha_Trang</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766814618/phu-quoc_esdojz.avif">Phu_Quoc</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766808964/GTC-2025-2026-%D0%A1%D0%98%D0%9D%D0%93%D0%90%D0%9F%D0%A3%D0%A0_mgn20x.png">Singapore</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766811281/Screenshot_2025-12-27_at_12.54.07_rawvoi.png">Thailand_Banggok</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766812636/%D0%97%D0%90%D0%A1%D0%A1%D0%90%D0%9D-%D0%9F%D0%A3%D0%9A%D0%95%D0%A2-%D0%90%D0%AF%D0%9B%D0%90%D0%9B_qkv2yn.png">Phuket</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766816644/turkey-antalya_dal0fu.jpg">Turkey</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766816083/bali-island-hut-ocean-sea-scenery-uhdpaper.com-hd-6.936_nb6cdr.jpg">
                      Bali
                    </option>
                    <option value="Janjieje">Janjieje</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766983510/shanghai_wloxzk.avif">Shanghai</option>
                    <option value="https://res.cloudinary.com/dvnzk53kp/image/upload/v1766818915/halong_bay_xlmuaw.jpg">Halong_Bay</option>
                    <option value="Dalyan">Dalyan</option>
                  </select>
                </div>

                {/* Gallery Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className={labelClass}>Зурагнууд</label>
                    <label className="cursor-pointer text-amber-600 dark:text-amber-400 text-xs font-medium hover:underline flex items-center">
                      <Plus className="h-3 w-3 mr-1" /> зураг нэмэх
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
                    {existingPhotos.slice(0, 6).map((url, idx) => (
                      <div
                        key={`ex-${idx}`}
                        className="aspect-square rounded-lg bg-gray-100 dark:bg-slate-700 relative group overflow-hidden ring-1 ring-black/5 dark:ring-white/5"
                      >
                        <img
                          src={url}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setExistingPhotos((p) =>
                              p.filter((_, i) => i !== idx)
                            )
                          }
                          className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white p-1 rounded-md opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {galleryFiles.map((file, idx) => (
                      <div
                        key={`new-${idx}`}
                        className="aspect-square rounded-lg bg-amber-50 dark:bg-amber-900/20 relative border border-amber-200 dark:border-amber-700/50 overflow-hidden"
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          className="w-full h-full object-cover opacity-80"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setGalleryFiles((p) =>
                              p.filter((_, i) => i !== idx)
                            )
                          }
                          className="absolute top-1 right-1 bg-red-500/90 hover:bg-red-600 text-white p-1 rounded-md shadow-sm"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {existingPhotos.length + galleryFiles.length === 0 && (
                      <div className="col-span-3 py-8 text-center rounded-lg border border-dashed border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/30">
                        <span className="text-xs text-gray-400 dark:text-slate-500">
                          No gallery photos
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Inputs */}
              <div className="md:col-span-2 space-y-5">
                <div>
                  <label className={labelClass}>Аялалын гарчиг</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="e.g. Magical Tour of Mongolia"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className={labelClass}>Улс</label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Mongolia"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Үнэ (₮)</label>
                    <input
                      name="single_supply_price"
                      value={formData.single_supply_price}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Хүүхдийн үнэ (₮)</label>
                    <input
                      name="child_price"
                      value={formData.child_price}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Зочид буудал</label>
                    <input
                      name="hotel"
                      value={formData.hotel}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="5 Star"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className={labelClass}>Genre:</label>
                    <select
                      name="genre"
                      value={formData.genre}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      className={inputClass}
                    >
                      <option value="">Хоосон</option>
                      <option value="Hainan">Hainan</option>
                      <option value="HoChiMinh_Phu_Quoc">
                        HoChiMinh_Phu_Quoc
                      </option>
                      <option value="Japan">Japan</option>
                      <option value="Nha_Trang">Nha_Trang</option>
                      <option value="Phu_Quoc">Phu_Quoc</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Thailand_Banggok">Thailand_Banggok</option>
                      <option value="Phuket">Phuket</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Bali">Bali</option>
                      <option value="Dalyan">Dalyan</option>
                      <option value="Shanghai">Shanghai</option>
                      <option value="Halong_Bay">Halong_Bay</option>
                      <option value="Janjieje">Janjieje</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>departure date</label>
                    <input
                      type="date"
                      name="departure_date"
                      value={formData.departure_date}
                      onChange={handleChange}
                      className={`${inputClass} dark:scheme-dark `}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Arrival date</label>
                    <input
                      type="date"
                      name="arrival_date"
                      value={formData.arrival_date}
                      onChange={handleChange}
                      className={`${inputClass} dark:scheme-dark `}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  <div>
                    <label className={labelClass}>Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="FULL">Full</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="COMPLETED">Done</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}> суудал</label>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Өдөр</label>
                    <input
                      name="duration_day"
                      value={formData.duration_day}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Шөнө</label>
                    <input
                      name="duration_night"
                      value={formData.duration_night}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 4"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>group size</label>
                    <input
                      name="group_size"
                      value={formData.group_size}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="e.g. 40"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className={labelClass}>Дэлгэрэнгүй мэдээлэл</label>
                  <textarea
                    name="description"
                    rows={10}
                    value={formData.description}
                    onChange={handleChange}
                    className={`${inputClass} resize-none leading-relaxed`}
                    placeholder="Write a detailed description of the tour..."
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-slate-700/80 flex justify-end gap-3 shrink-0 bg-gray-50/50 dark:bg-slate-800/50 rounded-b-2xl">
          <button
            disabled={isSaving}
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 cursor-pointer text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Буцах
          </button>
          <button
            disabled={isSaving}
            type="submit"
            form="tourForm"
            className="px-6 py-2.5 cursor-pointer text-sm font-bold bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-white rounded-lg shadow-lg shadow-amber-600/20 flex items-center gap-2 transition-all transform active:scale-95"
          >
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {tourToEdit ? "Аялал засах" : "Аялал үүсгэх"}
          </button>
        </div>
      </div>
    </div>
  );
}
