import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Flame, AlertCircle } from "lucide-react";
import type { Tour } from "@/types";
import { useState } from "react";

interface BookingDialogProps {
  tour: Tour;
  children: React.ReactNode;
}

interface FormData {
  passengers: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

interface FormErrors {
  passengers?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export default function BookingDialog({ tour, children }: BookingDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    passengers: "1",
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const formatDate = (date?: string | null) => {
    if (!date) return "TBD";
    return new Date(date).toLocaleDateString("mn-MN", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Нэрээ оруулна уу";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Нэр хэтэрхий богино байна";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Утасны дугаараа оруулна уу";
    } else if (
      !/^(\+976|976)?\s*\d{8}$/.test(formData.phone.replace(/[\s-]/g, ""))
    ) {
      newErrors.phone = "Утасны дугаар буруу байна";
    }

    if (!formData.email.trim()) {
      newErrors.email = "И-мэйл хаягаа оруулна уу";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "И-мэйл хаяг буруу байна";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    if (tour.seats <= 0) {
      alert("Уучлаарай, энэ аялал дүүрсэн байна");
      return;
    }

    const requestedSeats = parseInt(formData.passengers);
    if (requestedSeats > tour.seats) {
      alert(`Уучлаарай, зөвхөн ${tour.seats} суудал үлдсэн байна`);
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/bookings', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     tourId: tour.id,
      //     tourTitle: tour.title,
      //     passengers: parseInt(formData.passengers),
      //     name: formData.name.trim(),
      //     phone: formData.phone.replace(/[\s-]/g, ''),
      //     email: formData.email.trim().toLowerCase(),
      //     notes: formData.notes.trim(),
      //     totalPrice: calculateTotalPrice(),
      //     departureDate: tour.departure_date,
      //     arrivalDate: tour.arrival_date
      //   })
      // });
      // if (!response.ok) throw new Error('Booking failed');

      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Амжилттай захиалга илгээлээ! Удалгүй холбоо барина шүү 🚀");
      setOpen(false);
      setFormData({
        passengers: "1",
        name: "",
        phone: "",
        email: "",
        notes: "",
      });
      setErrors({});
    } catch (error) {
      alert("Алдаа гарлаа. Дахин оролдоно уу.");
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const calculateTotalPrice = () => {
    const passengerCount = Number(formData.passengers);
    const price = Number(tour.single_supply_price ?? 0);

    return price * passengerCount;
  };

  const isFormValid =
    formData.name.trim() && formData.phone.trim() && formData.email.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Захиалга хийх
          </DialogTitle>
          <DialogDescription className="text-base">
            {tour.title} • {tour.duration_day} өдөр
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-6">
          {/* Number of Travelers */}
          <div className="grid gap-2">
            <Label htmlFor="passengers">
              Явагчдын тоо
              {tour.seats > 0 && tour.seats < 8 && (
                <span className="text-xs text-slate-500 ml-2">
                  (Үлдсэн: {tour.seats})
                </span>
              )}
            </Label>
            <Select
              value={formData.passengers}
              onValueChange={(value) => handleInputChange("passengers", value)}
            >
              <SelectTrigger id="passengers">
                <SelectValue placeholder="Сонгоно уу" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <SelectItem
                    key={n}
                    value={n.toString()}
                    disabled={n > tour.seats}
                  >
                    {n} {n === 1 ? "Насанд хүрсэн" : "Насанд хүрэгчид"}
                    {n > tour.seats && " (дүүрсэн)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Full Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">
              Бүтэн нэр (Паспорт дээрхээр){" "}
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Бат-Эрдэнэ Г."
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="grid gap-2">
            <Label htmlFor="phone">
              Утасны дугаар <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+976 99110000"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">
              И-мэйл хаяг <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>

          {/* Special Requests */}
          <div className="grid gap-2">
            <Label htmlFor="notes">Нэмэлт хүсэлт (заавал биш)</Label>
            <Textarea
              id="notes"
              placeholder="Хоолны онцлог, өрөөний сонголт гэх мэт..."
              rows={4}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>

          {/* Tour Info Reminder */}
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
            <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
              Явна: {formatDate(tour.departure_date)} | Буцаж ирнэ:{" "}
              {formatDate(tour.arrival_date)}
            </p>
            <p className="text-xs text-amber-700 dark:text-amber-300 mt-2 flex items-center gap-1">
              {tour.seats <= 0 ? (
                <>Дүүрсэн</>
              ) : tour.seats <= 5 ? (
                <>
                  <Flame className="h-4 w-4 animate-pulse" /> Цөөхөн суудал
                  үлдлээ!
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Суудал байна
                </>
              )}
            </p>
          </div>

          {/* Price Summary */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {formData.passengers}{" "}
                {parseInt(formData.passengers) === 1 ? "хүн" : "хүн"}
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
                ₮{calculateTotalPrice().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="flex-1"
            disabled={isSubmitting}
          >
            Болих
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || !isFormValid || tour.seats <= 0}
          >
            {isSubmitting ? "Илгээж байна..." : "Захиалга баталгаажуулах"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
