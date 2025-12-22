export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "CLIENT" | "MANAGER" | "ADMIN";
  avatar: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  image: string | null; // from cover_photo AS image
  country: string;
  departure_date: string | null;
  arrival_date: string | null;
  hotel: string | null;
  photos: string | null; // JSON or text[] – can be any for now
  breakfast: string | null;
  lunch: string | null;
  dinner: string | null;
  single_supply_price: string | null; // from single_supply_price AS price
  additional_bed: string | null;
  country_temperature: string | null;
  created_at: string;
  duration_day: string;
  duration_night:string;
  group_size: number;
  is_featured: boolean;
  subtitle: string;
  status: "ACTIVE" | "FULL" | "COMPLETED" | "INACTIVE";
  seats: number;
  image_public_id: string | null;
  slug: string | null;
  type: string ;
}

export interface UserProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone_number: string;
  avatar: string;
}
