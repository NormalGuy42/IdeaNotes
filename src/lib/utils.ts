import { defaultIconsList } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getIconPathByName = (iconName: string, iconGroups: defaultIconsList[]): string | undefined => {
  for (const group of iconGroups) {
      const icon = group.icons.find(icon => icon.iconName === iconName);
      if (icon) {
        return icon.iconImg;
      }
  }
  return undefined;
};