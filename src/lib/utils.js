import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function convertToQueryString(params) {
  const queryStrings = [];
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      queryStrings.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  }
  return queryStrings.join("&");
}