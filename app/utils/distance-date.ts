import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export const distanceDate = (date: string) => {
  return formatDistanceToNow(date, {
    locale: id, // Mengatur locale ke bahasa Indonesia
    addSuffix: true, // Menambahkan 'yang lalu' pada hasil
  });
};
