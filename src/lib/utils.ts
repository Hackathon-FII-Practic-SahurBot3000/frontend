import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to format numbers consistently (prevents hydration mismatches)
export function formatNumber(num: number): string {
  return num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
