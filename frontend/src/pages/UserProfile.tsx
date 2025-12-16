import { useState, useEffect, useRef,  } from "react";
import type{ChangeEvent, FormEvent} from "react"
import axios from "axios";
import { Camera } from "lucide-react";

// 1. Define the shape of your User data
interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  avatar: string;
}

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 2. Type the Ref correctly
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
        // Ensure this matches your backend route exactly
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // 3. Safely merge data
        setFormData((prev) => ({
          ...prev,
          firstName: res.data.firstname || "", // Handle DB naming differences (firstname vs firstName)
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

  // 4. Typed Change Handler
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

    // 1. FIX: Retrieve the token here
    const token = localStorage.getItem("token");

    try {
      setSaving(true);

      const res = await axios.post("/api/upload", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // 2. FIX: Add the Authorization header
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

  // 5. Typed Image Handler
  // const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // --- OPTION A: Base64 (Use this if you don't have an upload server yet) ---
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
  //   };
  //   reader.readAsDataURL(file);

  //   // --- OPTION B: Upload Server (Uncomment when backend is ready) ---
  //   /*
  //   const uploadData = new FormData();
  //   uploadData.append("file", file);
  //   try {
  //     const res = await axios.post("/api/upload", uploadData, {
  //       headers: { "Content-Type": "multipart/form-data" }
  //     });
  //     setFormData((prev) => ({ ...prev, avatar: res.data.url }));
  //   } catch (err) {
  //     console.error("Upload failed", err);
  //     alert("Failed to upload image");
  //   }
  //   */
  // };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem("token");

      // 1. Create a payload that matches the Backend's expected column names
      const payload = {
        firstname: formData.firstName, // Map firstName -> firstname
        lastname: formData.lastName, // Map lastName -> lastname
        phone_number: formData.phone_number,
       
        avatar: formData.avatar,
      };

      // 2. Send the mapped payload instead of formData
      // Make sure this URL matches your backend route!
      // If your GET is /api/auth/me, your PUT might be there too.
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

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-[5%]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Хувийн мэдээлэл
        </h1>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header / Avatar Section */}
          <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row items-center gap-6">
            {/* Avatar Upload Wrapper */}
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()} // Safe access
            >
              <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
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
              <h2 className="text-xl font-semibold text-gray-900">
                {formData.firstName || "User"} {formData.lastName}
              </h2>
              <p className="text-gray-500">{formData.email}</p>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium md:hidden">
                Зураг солих
              </button>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Нэр</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Таны нэр"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Овог
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="Таны овог"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Имэйл хаяг
                </label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-500 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Утасны дугаар
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  placeholder="+976 9911xxxx"
                />
              </div>
            </div>

            

            <div className="pt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                Буцах
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/20 transition-all disabled:opacity-70">
                {saving ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
