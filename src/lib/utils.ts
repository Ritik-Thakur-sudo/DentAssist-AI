import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  return `${base}/boy?username=${username}`;
}

export const formatIndianMobile = (value: string) => {
  if (!value) return value;

  // Remove all non-digits
  let digits = value.replace(/\D/g, "");

  // Remove country code if user types 91 at start
  if (digits.startsWith("91") && digits.length > 10) {
    digits = digits.slice(2);
  }

  // Limit to 10 digits
  digits = digits.slice(0, 10);

  // Auto format while typing
  if (digits.length <= 5) return digits;

  return `${digits.slice(0, 5)} ${digits.slice(5)}`;
};

export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};

export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$50" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$75" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$65" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$100" },
];