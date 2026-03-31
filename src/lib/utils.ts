import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, "").toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if (gender === "FEMALE") return `${base}/girl?username=${username}`;
  // default to boy
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