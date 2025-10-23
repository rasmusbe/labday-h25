import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Activity } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function getActivityBySlug(activities: Activity[], slug: string): Activity | undefined {
  return activities.find(activity => activity.slug === slug);
}
