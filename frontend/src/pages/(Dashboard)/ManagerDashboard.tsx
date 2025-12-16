
// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   X,
  
//   Upload,
//   Users,
  
// } from "lucide-react";
// import toast from "react-hot-toast";

// interface Trip {
//   id: string;
//   title: string;
//   description: string;
//   image: string;
//   country: string;
//   departure_date: string;
//   hotel: string;
//   breakfast: string;
//   lunch: string;
//   dinner: string;
//   price: string;
//   additional_bed: string;
//   country_temperature: string;
//   status: "OPEN" | "FULL" | "CLOSED"; // New
//   seats: number; // New
// }

// export default function ManagerDashboard() {
//   const [trips, setTrips] = useState<Trip[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTripId, setEditingTripId] = useState<string | null>(null);

//   // We use 'any' for the form state temporarily because File objects are complex
//   const [formData, setFormData] = useState<any>({
//     title: "",
//     description: "",
//     country: "",
//     departure_date: "",
//     hotel: "",
//     breakfast: "",
//     lunch: "",
//     dinner: "",
//     single_supply_price: "",
//     additional_bed: "",
//     country_temperature: "",
//     status: "OPEN",
//     seats: 20,
//   });

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data", // Important for files!
//       },
//     };
//   };

//   const fetchTrips = async () => {
//     try {
//       const res = await axios.get("/api/trips");
//       setTrips(res.data);
//     } catch (err) {
//       toast.error("Failed to load trips");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTrips();
//   }, []);

//   const handleDelete = async (id: string) => {
//     if (!window.confirm("Delete this trip?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`/api/trips/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTrips(trips.filter((t) => t.id !== id));
//       toast.success("Deleted!");
//     } catch (err) {
//       toast.error("Failed to delete");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // 1. Create FormData object (Required for file uploads)
//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });
//     if (selectedFile) {
//       data.append("cover_photo", selectedFile);
//     }

//     try {
//       if (editingTripId) {
//         const res = await axios.put(
//           `/api/trips/${editingTripId}`,
//           data,
//           getAuthHeaders()
//         );
//         setTrips(
//           trips.map((t) => (t.id === editingTripId ? res.data.trip : t))
//         );
//         toast.success("Updated!");
//       } else {
//         const res = await axios.post("/api/trips", data, getAuthHeaders());
//         setTrips([res.data.trip, ...trips]);
//         toast.success("Created!");
//       }
//       closeModal();
//     } catch (err: any) {
//       console.error(err);
//       toast.error("Failed to save");
//     }
//   };

//   const openModal = (trip?: Trip) => {
//     if (trip) {
//       setEditingTripId(trip.id);
//       setFormData({
//         title: trip.title || "",
//         description: trip.description || "",
//         country: trip.country || "",
//         departure_date: trip.departure_date
//           ? trip.departure_date.split("T")[0]
//           : "",
//         hotel: trip.hotel || "",
//         breakfast: trip.breakfast || "",
//         lunch: trip.lunch || "",
//         dinner: trip.dinner || "",
//         single_supply_price: trip.price || "",
//         additional_bed: trip.additional_bed || "",
//         country_temperature: trip.country_temperature || "",
//         status: trip.status || "OPEN",
//         seats: trip.seats || 20,
//       });
//       setPreviewUrl(trip.image); // Show existing image
//     } else {
//       setEditingTripId(null);
//       setFormData({
//         title: "",
//         description: "",
//         country: "",
//         departure_date: "",
//         hotel: "",
//         breakfast: "",
//         lunch: "",
//         dinner: "",
//         single_supply_price: "",
//         additional_bed: "",
//         country_temperature: "",
//         status: "OPEN",
//         seats: 20,
//       });
//       setPreviewUrl(null);
//     }
//     setSelectedFile(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => setIsModalOpen(false);

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file)); // Show preview immediately
//     }
//   };

//   // Helper for Status Badge
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "OPEN":
//         return "bg-green-100 text-green-800";
//       case "FULL":
//         return "bg-red-100 text-red-800";
//       case "CLOSED":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };
// console.log(trips)
//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8 flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Trip Management ✈️
//           </h1>
//           <button
//             onClick={() => openModal()}
//             className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-bold text-white hover:bg-amber-700 transition shadow-lg">
//             <Plus className="h-5 w-5" /> Add New Trip
//           </button>
//         </div>

//         <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
//               <tr>
//                 <th className="p-4 border-b">Trip</th>
//                 <th className="p-4 border-b">Status</th>
//                 <th className="p-4 border-b">Seats</th>
//                 <th className="p-4 border-b">Price</th>
//                 <th className="p-4 border-b text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {trips.map((trip) => (
//                 <tr key={trip.id} className="hover:bg-gray-50 transition">
//                   <td className="p-4 flex items-center gap-4">
//                     <img
//                       src={trip.image || "https://placehold.co/100x60"}
//                       alt=""
//                       className="h-12 w-16 rounded object-cover bg-gray-200"
//                     />
//                     <div>
//                       <div className="font-bold text-gray-900">
//                         {trip.title}
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         {trip.country}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
//                         trip.status
//                       )}`}>
//                       {trip.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-gray-600">
//                     <div className="flex items-center gap-1">
//                       <Users className="h-4 w-4" /> {trip.seats}
//                     </div>
//                   </td>
//                   <td className="p-4 font-bold text-amber-600">
//                     ${trip.price}
//                   </td>
//                   <td className="p-4 text-right space-x-2">
//                     <button
//                       onClick={() => openModal(trip)}
//                       className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
//                       <Edit className="h-5 w-5" />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(trip.id)}
//                       className="p-2 text-red-600 hover:bg-red-50 rounded-full">
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
//           <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl my-8">
//             <div className="flex justify-between mb-6">
//               <h2 className="text-2xl font-bold">
//                 {editingTripId ? "Edit Trip" : "New Trip"}
//               </h2>
//               <button onClick={closeModal}>
//                 <X className="h-6 w-6 text-gray-400" />
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Image Upload Section */}
//               <div className="flex items-center gap-6">
//                 <div className="h-32 w-48 rounded-lg bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden relative">
//                   {previewUrl ? (
//                     <img
//                       src={previewUrl}
//                       alt="Preview"
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-gray-400 text-sm">No Image</span>
//                   )}
//                 </div>
//                 <div>
//                   <label className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition inline-flex items-center gap-2 ">
//                     <Upload className="h-4 w-4" /> Upload Photo
//                     <input
//                       type="file"
//                       className="hidden"
//                       onChange={handleFileChange}
//                       accept="image/*"
//                     />
//                   </label>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Recommended: 1200x800px
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Title
//                   </label>
//                   <input
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                     required
//                   />
//                 </div>

//                 {/* Status & Seats */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Status
//                   </label>
//                   <select
//                     name="status"
//                     value={formData.status}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none">
//                     <option value="OPEN">🟢 Open</option>
//                     <option value="FULL">🔴 Full</option>
//                     <option value="CLOSED">⚫ Closed</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Available Seats
//                   </label>
//                   <input
//                     type="number"
//                     name="seats"
//                     value={formData.seats}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Country
//                   </label>
//                   <input
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Date
//                   </label>
//                   <input
//                     type="date"
//                     name="departure_date"
//                     value={formData.departure_date}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Price ($)
//                   </label>
//                   <input
//                     name="single_supply_price"
//                     value={formData.single_supply_price}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Hotel
//                   </label>
//                   <input
//                     name="hotel"
//                     value={formData.hotel}
//                     onChange={handleChange}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-3 gap-4">
//                 <input
//                   name="breakfast"
//                   placeholder="Breakfast"
//                   value={formData.breakfast}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                 />
//                 <input
//                   name="lunch"
//                   placeholder="Lunch"
//                   value={formData.lunch}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                 />
//                 <input
//                   name="dinner"
//                   placeholder="Dinner"
//                   value={formData.dinner}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   name="description"
//                   rows={3}
//                   value={formData.description}
//                   onChange={handleChange}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none resize-none"
//                 />
//               </div>

//               <div className="flex justify-end gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold">
//                   Save Trip
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Users,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";

// 1. Fix Interface to match Database Column Name
interface Trip {
  id: string;
  title: string;
  description: string;
  image: string;
  country: string;
  departure_date: string;
  hotel: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  single_supply_price: string; // 👈 Changed from 'price' to match DB
  additional_bed: string;
  country_temperature: string;
  status: "OPEN" | "FULL" | "CLOSED";
  seats: number;
}

export default function ManagerDashboard() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

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
    status: "OPEN",
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

  const fetchTrips = async () => {
    try {
      const res = await axios.get("/api/trips");
      setTrips(res.data);
    } catch (err) {
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this trip?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(trips.filter((t) => t.id !== id));
      toast.success("Deleted!");
    } catch (err) {
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
      if (editingTripId) {
        const res = await axios.put(
          `/api/trips/${editingTripId}`,
          data,
          getAuthHeaders()
        );
        setTrips(
          trips.map((t) => (t.id === editingTripId ? res.data.trip : t))
        );
        toast.success("Updated!");
      } else {
        const res = await axios.post("/api/trips", data, getAuthHeaders());
        setTrips([res.data.trip, ...trips]);
        toast.success("Created!");
      }
      closeModal();
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to save");
    }
  };

  const openModal = (trip?: Trip) => {
    if (trip) {
      setEditingTripId(trip.id);
      setFormData({
        title: trip.title || "",
        description: trip.description || "",
        country: trip.country || "",
        departure_date: trip.departure_date
          ? trip.departure_date.split("T")[0]
          : "",
        hotel: trip.hotel || "",
        breakfast: trip.breakfast || "",
        lunch: trip.lunch || "",
        dinner: trip.dinner || "",
        single_supply_price: trip.single_supply_price || "", // 👈 Use correct field
        additional_bed: trip.additional_bed || "",
        country_temperature: trip.country_temperature || "",
        status: trip.status || "OPEN",
        seats: trip.seats || 20,
      });
      setPreviewUrl(trip.image);
    } else {
      setEditingTripId(null);
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
        status: "OPEN",
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
      case "OPEN": return "bg-green-100 text-green-800";
      case "FULL": return "bg-red-100 text-red-800";
      case "CLOSED": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Trip Management ✈️
          </h1>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 rounded-lg bg-amber-600 px-6 py-3 font-bold text-white hover:bg-amber-700 transition shadow-lg"
          >
            <Plus className="h-5 w-5" /> Add New Trip
          </button>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-sm font-semibold">
              <tr>
                <th className="p-4 border-b">Trip</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Seats</th>
                <th className="p-4 border-b">Price</th>
                <th className="p-4 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center"><Loader2 className="animate-spin mx-auto"/></td></tr>
              ) : trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50 transition">
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={trip.image || "https://placehold.co/100x60"}
                      alt=""
                      className="h-12 w-16 rounded object-cover bg-gray-200"
                    />
                    <div>
                      <div className="font-bold text-gray-900">
                        {trip.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {trip.country}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(
                        trip.status
                      )}`}
                    >
                      {trip.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" /> {trip.seats}
                    </div>
                  </td>
                  {/* 👇 FIXED: Using single_supply_price */}
                  <td className="p-4 font-bold text-amber-600">
                    ${trip.single_supply_price}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => openModal(trip)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(trip.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-8 shadow-2xl my-8">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {editingTripId ? "Edit Trip" : "New Trip"}
              </h2>
              <button onClick={closeModal}>
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                  >
                    <option value="OPEN">🟢 Open</option>
                    <option value="FULL">🔴 Full</option>
                    <option value="CLOSED">⚫ Closed</option>
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
                    Price ($)
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
                <input
                  name="breakfast"
                  placeholder="Breakfast"
                  value={formData.breakfast}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                />
                <input
                  name="lunch"
                  placeholder="Lunch"
                  value={formData.lunch}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                />
                <input
                  name="dinner"
                  placeholder="Dinner"
                  value={formData.dinner}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-amber-500 outline-none"
                />
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
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 font-bold"
                >
                  Save Trip
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}