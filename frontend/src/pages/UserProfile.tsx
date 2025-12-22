import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@mui/material/Button";
import type { UserProfileData } from "@/types";

export default function UserProfile() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData((prev) => ({
          ...prev,
          firstName: res.data.firstname || "",
          lastName: res.data.lastname || "",
          email: res.data.email || "",
          phone_number: res.data.phone_number || "",
          avatar: res.data.avatar || "",
        }));
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      setSaving(true);

      const res = await axios.post("/api/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = res.data.url;
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      const payload = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        phone_number: formData.phone_number,
        avatar: formData.avatar,
      };

      await axios.put("/api/users/me", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <div className="p-10 text-center text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-[5%]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Хувийн мэдээлэл
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Header / Avatar Section */}
          <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Upload Wrapper */}
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 border-4 border-white dark:border-gray-600 shadow-md">
                <img
                  src={
                    formData.avatar ||
                    `https://ui-avatars.com/api/?name=${formData.email}&background=random`
                  }
                  alt="Profile"
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
                />

                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white h-6 w-6" />
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {formData.firstName || "User"} {formData.lastName}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                {formData.email}
              </p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium md:hidden"
              >
                Зураг солих
              </button>
            </div>

            <Button
              onClick={logout}
              variant="outlined"
              color="error"
              className="cursor-pointer"
            >
              Sign out
            </Button>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Нэр
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Таны нэр"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Овог
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Таны овог"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Имэйл хаяг
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 px-4 py-2.5 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Утасны дугаар
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2.5 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="+976 9911xxxx"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-4">
              <Button
                color="secondary"
                className="cursor-pointer"
                onClick={() => window.history.back()}
                variant="contained"
              >
                Буцах
              </Button>
              <Button
                className="cursor-pointer"
                color="success"
                type="submit"
                variant="contained"
                disabled={saving}
              >
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
