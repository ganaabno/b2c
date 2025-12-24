import { useState } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Tour } from "@/types";
import ManagerTourTable from "@/components/manager/ManagerTourTable";
import ManagerTourModal from "@/components/manager/ManagerTourModal";

export default function ManagerDashboard() {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Tour | null>(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
  };

  // --- Queries ---
  const { data: tours = [], isLoading: loading } = useQuery({
    queryKey: ["tours"],
    queryFn: async () => {
      const res = await axios.get("/api/tours");
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  // --- Mutations ---
  const saveMutation = useMutation({
    // FIX: Accept ID and Data as arguments here
    mutationFn: async ({ id, data }: { id?: string; data: FormData }) => {
      if (id) {
        return axios.put(`/api/tours/${id}`, data, getAuthHeaders());
      } else {
        return axios.post("/api/tours", data, getAuthHeaders());
      }
    },
    onSuccess: (_, variables) => {
      // variables.id tells us if it was an edit or create
      toast.success(variables.id ? "Updated!" : "Created!");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      closeModal();
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error("Failed to save tour");
    },
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
        toast.error(err.message || "Failed to delete");
      }
    },
  });

  // --- Handlers ---
  const handleDelete = async (id: string) => {
    if (!window.confirm(`Delete this tour?`)) return;
    deleteMutation.mutate(id);
  };

  const openCreateModal = () => {
    setEditingTour(null);
    setIsModalOpen(true);
  };

  const openEditModal = (tour: Tour) => {
    setEditingTour(tour);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTour(null);
  };

  const handleSave = (formData: FormData) => {
    // FIX: Pass the ID explicitly when calling mutate
    saveMutation.mutate({
      id: editingTour?.id,
      data: formData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Tour Management ✈️
          </h1>
          <button
            onClick={openCreateModal}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-amber-600 dark:bg-amber-500 px-6 py-3 font-bold text-white hover:bg-amber-700 dark:hover:bg-amber-600 transition shadow-lg">
            <Plus className="h-5 w-5" /> Аялал нэмэх
          </button>
        </div>

        {/* Table Component */}
        <ManagerTourTable
          tours={tours}
          loading={loading}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal Component */}
      <ManagerTourModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tourToEdit={editingTour}
        onSave={handleSave}
        isSaving={saveMutation.isPending}
      />
    </div>
  );
}
