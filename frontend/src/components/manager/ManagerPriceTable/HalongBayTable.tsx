import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Loader2, X, Plus, Trash2 } from "lucide-react";

type Row = {
  id: string;
  departure_date: string | null;
  adult_price: string | null;
  availability: string | null;
};

const deleteHalongBay = async (id: string) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/price_table/halong_bay/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Delete failed");
  }
  return true;
};

const fetchHalongBay = async (): Promise<Row[]> => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/price_table/halong_bay", {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    if (res.status === 401)
      throw new Error(
        "Unauthorized. Please login with an account that has MANAGER or ADMIN role."
      );
    throw new Error(err.message || "Failed to fetch Halong Bay price table");
  }

  const body = await res.json();
  return body.data as Row[];
};

const updateHalongBay = async (id: string, body: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/price_table/halong_bay/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Update failed");
  }
  return res.json();
};

const createHalongBay = async (body: any) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/price_table/halong_bay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Create failed");
  }
  return res.json();
};

const HalongBayTable = () => {
  const qc = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["halongBayPrices"],
    queryFn: fetchHalongBay,
  });
  const [editing, setEditing] = useState<Row | null>(null);
  const mutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) =>
      updateHalongBay(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["halongBayPrices"] }),
  });

  const [creating, setCreating] = useState(false);
  const [newRow, setNewRow] = useState<{
    departure_date: string;
    adult_price: string;
    availability: string;
  }>({ departure_date: "", adult_price: "", availability: "" });

  const createMutation = useMutation({
    mutationFn: (body: any) => createHalongBay(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["halongBayPrices"] });
      setCreating(false);
      setNewRow({ departure_date: "", adult_price: "", availability: "" });
    },
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteHalongBay(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["halongBayPrices"] }),
    onSettled: () => setDeletingId(null),
  });

  const startEdit = (row: Row) => setEditing(row);
  const closeEdit = () => setEditing(null);

  const handleDelete = (id: string) => {
    const ok = window.confirm("Delete this row? This action cannot be undone.");
    if (!ok) return;
    setDeletingId(id);
    deleteMutation.mutate(id);
  };

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    mutation.mutate({
      id: editing.id,
      body: {
        departure_date: editing.departure_date,
        adult_price: editing.adult_price,
        availability: editing.availability,
      },
    });
  };

  return (
    <div className="w-auto">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Halong Bay Price Table</h3>
        <button
          onClick={() => {
            setCreating(true);
            setNewRow({
              departure_date: "",
              adult_price: "",
              availability: "",
            });
          }}
          className="flex items-center cursor-pointer gap-2 px-3 py-1 rounded bg-amber-600 text-white">
          <Plus className="h-4 w-4" /> Add Row
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300 uppercase text-sm font-semibold">
            <tr>
              <th className="px-2 py-4 border-b">Departure</th>
              <th className="px-2 py-4 border-b">Adult Price</th>
              <th className="px-2 py-4 border-b">Availability</th>
              <th className="px-2 py-4 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center">
                  <Loader2 className="animate-spin mx-auto text-gray-500" />
                </td>
              </tr>
            ) : isError ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-red-600">
                  {(error as any)?.message || "Failed to load"}
                </td>
              </tr>
            ) : (
              (data || []).map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                  <td className="p-2">
                    {row.departure_date ? row.departure_date.split("T")[0] : ""}
                  </td>
                  <td className="p-2 font-bold text-amber-600">
                    ₮{Number(row.adult_price || 0).toLocaleString()}
                  </td>
                  <td className="p-2 text-sm text-gray-600 wrap-break-word max-w-xl">
                    {row.availability}
                  </td>
                  <td className="p-2 text-right flex justify-end items-center gap-2">
                    <button
                      onClick={() => startEdit(row)}
                      className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded-full">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={
                        deleteMutation.status === "pending" &&
                        deletingId === row.id
                      }
                      className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded-full">
                      {deleteMutation.status === "pending" &&
                      deletingId === row.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeEdit} />
          <form
            onSubmit={onSave}
            className="relative z-50 w-[600px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Edit Halong Bay Row</h3>
              <button
                type="button"
                onClick={closeEdit}
                className="p-1 cursor-pointer text-gray-500 hover:bg-gray-100 rounded">
                <X />
              </button>
            </div>

            <label className="block mb-2 text-sm">Departure Date</label>
            <input
              type="date"
              value={
                editing.departure_date
                  ? editing.departure_date.split("T")[0]
                  : ""
              }
              onChange={(e) =>
                setEditing({ ...editing, departure_date: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 rounded border"
            />

            <label className="block mb-2 text-sm">Adult Price</label>
            <input
              type="number"
              value={editing.adult_price ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, adult_price: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 rounded border"
            />

            <label className="block mb-2 text-sm">Availability (text)</label>
            <textarea
              value={editing.availability ?? ""}
              onChange={(e) =>
                setEditing({ ...editing, availability: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 rounded border"
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEdit}
                className="px-4 cursor-pointer py-2 rounded border">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 cursor-pointer py-2 rounded bg-amber-600 text-white">
                {mutation.status === "pending" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Save"
                )}
              </button>
            </div>

            {mutation.isError && (
              <div className="mt-3 text-red-600">
                Failed to save: {(mutation.error as any)?.message}
              </div>
            )}
            {mutation.isSuccess && (
              <div className="mt-3 text-green-600">Saved successfully</div>
            )}
          </form>
        </div>
      )}

      {creating && (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setCreating(false)}
          />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              createMutation.mutate(newRow);
            }}
            className="relative z-50 w-[600px] bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Add Halong Bay Row</h3>
              <button
                type="button"
                onClick={() => setCreating(false)}
                className="p-1 cursor-pointer text-gray-500 hover:bg-gray-100 rounded">
                <X />
              </button>
            </div>

            <label className="block mb-2 text-sm">Departure Date</label>
            <input
              type="date"
              value={newRow.departure_date}
              onChange={(e) =>
                setNewRow({ ...newRow, departure_date: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 rounded border"
            />

            <label className="block mb-2 text-sm">Adult Price</label>
            <input
              type="number"
              value={newRow.adult_price}
              onChange={(e) =>
                setNewRow({ ...newRow, adult_price: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 rounded border"
            />

            <label className="block mb-2 text-sm">Availability (text)</label>
            <textarea
              value={newRow.availability}
              onChange={(e) =>
                setNewRow({ ...newRow, availability: e.target.value })
              }
              className="w-full mb-3 px-3 py-2 rounded border"
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCreating(false)}
                className="px-4 cursor-pointer py-2 rounded border">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 cursor-pointer py-2 rounded bg-amber-600 text-white">
                {createMutation.status === "pending" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Create"
                )}
              </button>
            </div>

            {createMutation.isError && (
              <div className="mt-3 text-red-600">
                Failed to create: {(createMutation.error as any)?.message}
              </div>
            )}
            {createMutation.isSuccess && (
              <div className="mt-3 text-green-600">Created successfully</div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default HalongBayTable;
