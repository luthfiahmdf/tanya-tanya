
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz"
export const distanceDate = (date?: string) => {
  if (!date) return "-"; // Kalau date kosong, kasih fallback

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "-"; // Kalau parsing gagal, fallback juga
  }

  const timeZone = "Asia/Jakarta";
  const zonedDate = toZonedTime(parsedDate, timeZone);
  return formatDistanceToNow(zonedDate, {
    locale: id,
    addSuffix: true,
  });
};

