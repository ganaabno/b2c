import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Camera, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Button from "@mui/material/Button";
import type { UserProfileData } from "@/types";

export default function UserProfile() {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    avatar: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    general: "",
  });

  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [originalData, setOriginalData] = useState<UserProfileData>({
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

        const userData = {
          firstName: res.data.firstname || "",
          lastName: res.data.lastname || "",
          email: res.data.email || "",
          phone_number: res.data.phone_number || "",
          avatar: res.data.avatar || "",
        };

        setFormData(userData);
        setOriginalData(userData);
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setHasChanges(true);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    // Clear errors for this field
    setPasswordErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const validatePasswordForm = () => {
    const errors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      general: "",
    };

    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }

    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/api/auth/change-password",
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        // Reset form on success
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setPasswordSuccess("Password changed successfully!");
        setPasswordErrors({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
          general: "",
        });

        // Clear success message after 3 seconds
        setTimeout(() => {
          setPasswordSuccess("");
        }, 3000);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Password change error:", error);
        const errorMessage =
          error.response?.data?.message || "Failed to change password";
        setPasswordErrors((prev) => ({ ...prev, general: errorMessage }));
      } else if (error instanceof Error) {
        console.error("Password change error:", error);
        setPasswordErrors((prev) => ({ ...prev, general: error.message }));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);

    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("/api/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const imageUrl = res.data.url;
      setFormData((prev) => ({ ...prev, avatar: imageUrl }));
      setHasChanges(true);
    } catch (err) {
      console.error("Upload failed", err);
      alert("Failed to upload image");
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

      setOriginalData(formData);
      setHasChanges(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(originalData);
    setHasChanges(false);
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-20">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-[80vh] bg-gray-50 dark:bg-gray-900 py-10 px-[5%]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Хувийн мэдээлэл
        </h1>

        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab("profile")}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === "profile"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}>
              Профайл
            </button>
            <button
              onClick={() => setActiveTab("password")}
              className={`pb-3 px-1 text-sm font-medium transition-colors ${
                activeTab === "password"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}>
              Нууц үг солих
            </button>
          </div>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Header / Avatar Section */}
            <div className="p-8 border-b border-gray-100 dark:border-gray-700 flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Upload Wrapper */}
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}>
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
                {formData.phone_number && (
                  <p className="text-gray-500 dark:text-gray-400">
                    {formData.phone_number}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium md:hidden">
                  Зураг солих
                </button>
              </div>

              <Button onClick={logout} variant="outlined" color="error">
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
                {hasChanges && (
                  <Button
                    color="secondary"
                    className="cursor-pointer"
                    onClick={handleReset}
                    variant="outlined">
                    Цуцлах
                  </Button>
                )}
                <Button
                  className="cursor-pointer"
                  color="success"
                  type="submit"
                  variant="contained"
                  disabled={saving || !hasChanges}>
                  {saving ? "Хадгалж байна..." : "Хадгалах"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Password Change Tab */}
        {activeTab === "password" && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              {/* Success Message */}
              {passwordSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <p className="text-green-700 dark:text-green-300">
                      {passwordSuccess}
                    </p>
                  </div>
                </div>
              )}

              {/* General Error */}
              {passwordErrors.general && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300">
                    {passwordErrors.general}
                  </p>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <Lock className="h-6 w-6 text-blue-500" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Нууц үг солих
                </h2>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Одоогийн нууц үг
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={`w-full rounded-lg border ${
                        passwordErrors.currentPassword
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 px-4 py-2.5 pr-12 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all`}
                      placeholder="Одоогийн нууц үгээ оруулна уу"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      {showPassword.current ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.currentPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Шинэ нууц үг
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={`w-full rounded-lg border ${
                        passwordErrors.newPassword
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 px-4 py-2.5 pr-12 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all`}
                      placeholder="Шинэ нууц үгээ оруулна уу"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      {showPassword.new ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.newPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.newPassword}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Хамгийн багадаа 8 тэмдэгт байх ёстой
                  </p>
                </div>

                {/* Confirm New Password */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Шинэ нууц үгээ баталгаажуулах
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className={`w-full rounded-lg border ${
                        passwordErrors.confirmPassword
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } bg-white dark:bg-gray-700 px-4 py-2.5 pr-12 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 outline-none transition-all`}
                      placeholder="Шинэ нууц үгээ дахин оруулна уу"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      {showPassword.confirm ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-sm text-red-500">
                      {passwordErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="pt-4 flex justify-end">
                  <Button
                    className="cursor-pointer"
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={saving}>
                    {saving ? "Хадгалж байна..." : "Нууц үг солих"}
                  </Button>
                </div>
              </form>

              {/* Password Tips */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
                  Нууц үгийн зөвлөмж:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
                  <li>• Хамгийн багадаа 8 тэмдэгт ашиглана уу</li>
                  <li>
                    • Том, жижиг үсэг, тоо, тусгай тэмдэгтүүдийг холино уу
                  </li>
                  <li>
                    • Өмнө хэрэглэж байсан нууц үгээ дахин ашиглахгүй байх
                  </li>
                  <li>
                    • Хувийн мэдээлэл (нэр, төрсөн өдөр гэх мэт) ашиглахгүй байх
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
