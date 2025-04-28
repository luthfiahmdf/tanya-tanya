
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const distanceDate = (date?: string) => {
  if (!date) return "-"; // Kalau date kosong, kasih fallback

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "-"; // Kalau parsing gagal, fallback juga
  }

  return formatDistanceToNow(parsedDate, {
    locale: id,
    addSuffix: true,
  });
};

