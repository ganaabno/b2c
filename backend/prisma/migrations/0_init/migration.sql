-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('on_trip', 'not_on_trip');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'MANAGER', 'PROVIDER', 'SUBAGENT', 'UGTAGCH', 'UDEGCH', 'CLIENT');

-- CreateTable
CREATE TABLE "Form" (
    "ID" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "tour_title" TEXT NOT NULL,
    "departure_date" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birth_date" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "passport_number" TEXT NOT NULL,
    "passport_expire_date" TEXT NOT NULL,
    "allergies" TEXT NOT NULL,
    "emergency_phone" TEXT NOT NULL,
    "room_allocation" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "room_type" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "additional_service" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "passport_upload" TEXT NOT NULL,
    "notes" TEXT,
    "pax_type" TEXT,
    "itinerary_status" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "manager_requests" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "request_status" TEXT DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "manager_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "provider_requests" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "request_status" TEXT DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "provider_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subcontractor_requests" (
    "id" UUID NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "request_status" TEXT DEFAULT 'PENDING',
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subcontractor_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cover_photo" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "departure_date" TEXT NOT NULL,
    "hotel" TEXT NOT NULL,
    "photos" TEXT[],
    "flight_seats" TEXT,
    "breakfast" TEXT,
    "lunch" TEXT,
    "dinner" TEXT,
    "single_supply_price" TEXT,
    "additional_bed" TEXT,
    "country_temperature" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "subtitle" TEXT,
    "duration" TEXT,
    "group_size" TEXT,
    "price_schedule" JSONB,
    "additional_prices" JSONB,
    "inclusions" JSONB,
    "hotels" JSONB,
    "free_inclusions" JSONB,
    "payment_options" JSONB,
    "itinerary" JSONB,
    "is_featured" BOOLEAN DEFAULT false,
    "status" TEXT DEFAULT 'active',
    "seats" INTEGER DEFAULT 0,
    "image_public_id" TEXT,
    "duration_day" TEXT,
    "duration_night" TEXT,
    "arrival_date" TEXT,
    "slug" TEXT,
    "program" TEXT[],

    CONSTRAINT "Trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "lastname" TEXT DEFAULT '',
    "firstname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT DEFAULT ARRAY['CLIENT'::"UserRole"],
    "status" "Status"[] DEFAULT ARRAY['not_on_trip']::"Status"[],
    "phone_number" TEXT,
    "password" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tours_slug_key" ON "tours"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "users"("email");

