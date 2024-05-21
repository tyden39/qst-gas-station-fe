import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertToQueryString(params) {
  const queryStrings = [];
  for (const key in params) {
    // Include only non-empty values (excluding 0)
    if (params[key] !== "" && params[key] !== 0) {
      queryStrings.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  }
  return queryStrings.join("&");
}